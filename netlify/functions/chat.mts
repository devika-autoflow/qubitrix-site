import Anthropic from "@anthropic-ai/sdk";

/**
 * Qubitrix Console — AI chat proxy (plan §13).
 * The API key lives HERE, server-side, never in the client bundle
 * (the old site exposed its Gemini key in the browser — this fixes that).
 *
 * Provider selection: ANTHROPIC_API_KEY → Claude; else GEMINI_API_KEY → Gemini;
 * else 503 and the client falls back to scripted demo mode.
 */

const SYSTEM_PROMPT = `You are Qubi, the on-site AI assistant for QUBITRIX (qubitrixai.com), an AI automation agency founded by Devika Raj NR. If asked your name, say Qubi.

What Qubitrix does:
- AI Agents: autonomous systems that reason, decide, and act (2-4 weeks per agent)
- AI Chatbots: knowledge-grounded support/sales bots for web and WhatsApp (1-3 weeks)
- Workflow Automation: n8n/Make pipelines that run operations hands-free (1-2 weeks per workflow)
- Custom AI Systems: bespoke pipelines, evals, and AI products (scoped per project)

Facts:
- Free 30-minute consultation, no obligation. Available Mon-Sun, 9:00-21:00 IST, remote worldwide.
- Contact: the booking form on the site, or the /book page.
- Pricing is scoped per project after the free consultation — never invent specific prices.

Style: concise (2-4 short sentences), confident, no emoji, no exclamation marks. If asked something unrelated to Qubitrix or AI services, politely steer back. Always guide interested visitors toward booking the free consultation.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function sanitize(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

async function askClaude(messages: ChatMessage[]): Promise<string> {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY
  const response = await client.messages.create({
    model: process.env.CHAT_MODEL ?? "claude-haiku-4-5",
    max_tokens: 512, // website chat: deliberately short replies
    system: SYSTEM_PROMPT,
    messages,
  });
  const block = response.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text : "";
}

async function askGemini(messages: ChatMessage[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: { maxOutputTokens: 512 },
      }),
    }
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

/**
 * Abuse controls. Without these the endpoint is an open, unmetered proxy to a
 * paid API — anyone can loop it and bill us.
 *
 * The bucket lives in module scope, so it is shared for the lifetime of a warm
 * instance only. That is deliberate: it is a cheap brake on scripted loops, not
 * a distributed quota. Set a hard spend cap in the provider console as well.
 */
const ALLOWED_ORIGINS = [
  "https://qubitrixai.com",
  "https://www.qubitrixai.com",
  "http://localhost:5173",
];
const MAX_BODY_BYTES = 16_000;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude ceiling on memory growth
  return recent.length > MAX_PER_WINDOW;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  // Same-origin only. A missing Origin header is rejected too — every real
  // browser fetch from the site sends one on a cross-origin-capable POST.
  const origin = req.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: "forbidden" }, 403);
  }

  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "60" },
    });
  }

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  let messages: ChatMessage[];
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);
    const body = JSON.parse(raw);
    messages = sanitize(body?.messages);
  } catch {
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let reply: string;
    if (process.env.ANTHROPIC_API_KEY) {
      reply = await askClaude(messages);
    } else if (process.env.GEMINI_API_KEY) {
      reply = await askGemini(messages);
    } else {
      return new Response(JSON.stringify({ error: "no_provider" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("chat function error:", err);
    return new Response(JSON.stringify({ error: "provider_error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

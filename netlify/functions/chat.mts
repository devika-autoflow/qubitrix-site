import Anthropic from "@anthropic-ai/sdk";

/**
 * Qubitrix Console — AI chat proxy (plan §13).
 * The API key lives HERE, server-side, never in the client bundle
 * (the old site exposed its Gemini key in the browser — this fixes that).
 *
 * Provider selection: ANTHROPIC_API_KEY → Claude; else GEMINI_API_KEY → Gemini;
 * else 503 and the client falls back to scripted demo mode.
 */

const SYSTEM_PROMPT = `You are the Qubitrix Assistant — the on-site AI for QUBITRIX (qubitrixai.com), an AI engineering studio founded by Devika Raj NR.

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

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
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

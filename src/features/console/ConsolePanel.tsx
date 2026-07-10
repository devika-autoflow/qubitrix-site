import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "../../content/site";
import { getChatIdentity, newChatId } from "../../lib/chatSession";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Qubitrix Assistant online. Ask about our systems, timelines, or how a build would work for your business.",
};

const INTENTS = [
  "What can you build for me?",
  "How long does an AI agent take?",
  "How do I book a consultation?",
];

/** Scripted fallback when no API key is configured — the console never dies. */
function demoReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("book") || t.includes("call") || t.includes("consult"))
    return "Use the form in the Contact section (or the /book page) — the first 30-minute consultation is free.";
  if (t.includes("price") || t.includes("cost"))
    return "Pricing is scoped per project after the free consultation, so you only pay for what the system needs to be.";
  if (t.includes("agent"))
    return "We build autonomous AI agents that own a job end-to-end — typically 2–4 weeks from scope to running system.";
  if (t.includes("chatbot") || t.includes("support"))
    return "Our chatbots are trained on your business and deploy to web and WhatsApp in 1–3 weeks.";
  if (t.includes("automat"))
    return "Workflow automation is our core: lead capture, follow-ups, reporting, and content pipelines that run while you sleep.";
  return "I can walk you through AI agents, chatbots, automation, or custom systems — or point you to the free consultation. What's eating your team's time?";
}

/** Pull a reply out of whatever shape the n8n webhook answers with. */
function parseWebhookReply(data: unknown): string | undefined {
  const first = Array.isArray(data) ? data[0] : data;
  if (typeof first === "string") return first || undefined;
  if (first && typeof first === "object") {
    const o = first as Record<string, unknown>;
    for (const key of ["reply", "output", "text", "message", "answer"]) {
      if (typeof o[key] === "string" && o[key]) return o[key] as string;
    }
  }
  return undefined;
}

export default function ConsolePanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [live, setLive] = useState<boolean | null>(null); // null = unknown yet
  // one conversation id per console open; user/session ids persist in storage
  const chatIdRef = useRef(newChatId());
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(history);
    setInput("");
    setBusy(true);

    // n8n webhook first (full session context), netlify function next, demo last
    try {
      if (!site.chatWebhookUrl) throw new Error("no webhook");
      const identity = getChatIdentity();
      const res = await fetch(site.chatWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: history.slice(1),
          chatId: chatIdRef.current,
          ...identity,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const reply = parseWebhookReply(await res.json().catch(() => undefined));
      if (!reply) throw new Error("empty");
      setLive(true);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      try {
        const res = await fetch("/.netlify/functions/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // greeting is UI-only; the API needs user-first alternation
          body: JSON.stringify({ messages: history.slice(1) }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { reply?: string };
        if (!data.reply) throw new Error("empty");
        setLive(true);
        setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      } catch {
        setLive(false);
        setMessages((m) => [...m, { role: "assistant", content: demoReply(trimmed) }]);
      }
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <div
      className="os-panel fixed bottom-0 right-0 z-[60] flex h-[min(640px,100dvh)] w-full flex-col rounded-none sm:bottom-6 sm:right-6 sm:h-[min(600px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-2xl"
      role="dialog"
      aria-label="Qubitrix assistant"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b hairline px-5 py-4">
        <p className="hud-label flex items-center gap-2.5">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              live === false ? "bg-warn" : "bg-ok"
            }`}
            aria-hidden="true"
          />
          QUBITRIX ASSISTANT{live === false ? " — DEMO" : " — ONLINE"}
        </p>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-colors hover:text-silver-100"
          aria-label="Close assistant"
        >
          ✕
        </button>
      </div>

      {/* log */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
      >
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-volt/15 text-silver-100"
                  : "bg-obsidian-3/80 text-silver-100"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex items-center gap-1.5 px-1" aria-label="Assistant is typing">
            <span className="qubit-dot" />
            <span className="qubit-dot" style={{ animationDelay: "0.3s" }} />
            <span className="qubit-dot" style={{ animationDelay: "0.6s" }} />
          </div>
        )}
      </div>

      {/* suggested intents */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-5 pb-3">
          {INTENTS.map((s) => (
            <button
              key={s}
              onClick={() => void send(s)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-silver-400 transition-colors hover:border-volt/40 hover:text-silver-100"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* input */}
      <form onSubmit={onSubmit} className="border-t hairline p-4">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the system…"
            aria-label="Message the assistant"
            className="flex-1 rounded-xl border border-white/10 bg-obsidian-1/80 px-4 py-2.5 text-sm text-silver-100 placeholder:text-silver-600 focus:border-volt/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="aurora-grad flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-obsidian-0 transition-opacity disabled:opacity-30"
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
        <p className="mt-2.5 text-center font-mono text-[10px] tracking-[0.1em] text-silver-600">
          OR EMAIL{" "}
          <a href={`mailto:${site.email}`} className="text-silver-400 hover:text-silver-100">
            {site.email.toUpperCase()}
          </a>
        </p>
      </form>
    </div>
  );
}

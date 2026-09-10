import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { TextField, TextArea } from "../../components/ui/Field";
import { site } from "../../content/site";
import { getChatIdentity } from "../../lib/chatSession";

const DOMAINS = ["Sales", "Support", "Operations", "Content", "Other"];
const OUTCOMES = [
  "Capture & qualify leads",
  "Answer customers 24/7",
  "Automate follow-ups",
  "Generate content",
  "Scrape & analyze data",
  "Connect my tools",
  "Something custom",
];

/**
 * "Request Builder" — the build-agent wizard rebuilt light (plan §13):
 * 3 steps, chips + one free-text, submits to the same webhook. No accounts.
 */
export default function RequestBuilder({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [domain, setDomain] = useState<string | null>(null);
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("button")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggleOutcome = (o: string) =>
    setOutcomes((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? "")) return;

    const identity = getChatIdentity();
    const payload = {
      type: "request-builder",
      submittedAt: new Date().toISOString(),
      page: window.location.pathname,
      ...identity,
      domain,
      outcomes,
      detail,
      ...data,
    };

    if (site.webhookUrl) {
      try {
        setStatus("sending");
        const res = await fetch(site.webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("bad status");
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    } else {
      const body = encodeURIComponent(
        `Domain: ${domain}\nOutcomes: ${outcomes.join(", ")}\nDetail: ${detail}\n\nName: ${data.name}\nEmail: ${data.email}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Solution request — Qubitrix"
      )}&body=${body}`;
      setStatus("sent");
    }
  };

  const chip = (label: string, selected: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 text-sm transition-all ${
        selected
          ? "border-volt bg-volt/12 text-silver-100 shadow-[0_0_18px_rgba(124,107,255,0.25)]"
          : "border-white/10 text-silver-400 hover:border-white/25 hover:text-silver-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Configure a solution">
      <button
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 bg-obsidian-0/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="os-panel absolute left-1/2 top-1/2 w-[min(92vw,560px)] -translate-x-1/2 -translate-y-1/2 p-7 sm:p-9"
      >
        <div className="flex items-center justify-between">
          <p className="hud-label">
            SOLUTION CONFIGURATOR — STEP {Math.min(step + 1, 3)}/3
          </p>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-silver-400 hover:text-silver-100"
            aria-label="Close configurator"
          >
            ✕
          </button>
        </div>

        {status === "sent" ? (
          <div className="py-10 text-center" role="status">
            <p className="metal-text font-display text-2xl font-semibold">Configuration received.</p>
            <p className="mt-3 text-sm text-silver-400">
              We now know exactly what's needed. Expect a reply within 24 hours.
            </p>
            <div className="mt-8">
              <Button variant="primary" onClick={onClose}>Done</Button>
            </div>
          </div>
        ) : step === 0 ? (
          <div className="mt-8">
            <h2 className="metal-text font-display text-xl font-semibold">
              Where is time bleeding?
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {DOMAINS.map((d) => chip(d, domain === d, () => setDomain(d)))}
            </div>
            <div className="mt-10 flex justify-end">
              <Button variant="primary" disabled={!domain} onClick={() => setStep(1)}>
                Next
              </Button>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="mt-8">
            <h2 className="metal-text font-display text-xl font-semibold">
              What should the system do?
            </h2>
            <p className="mt-1.5 text-xs text-silver-600">Choose any that apply.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {OUTCOMES.map((o) => chip(o, outcomes.includes(o), () => toggleOutcome(o)))}
            </div>
            <div className="mt-6">
              <TextArea
                label="Anything specific? (optional)"
                name="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={3}
              />
            </div>
            <div className="mt-8 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button variant="primary" disabled={outcomes.length === 0} onClick={() => setStep(2)}>
                Next
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8" noValidate>
            <h2 className="metal-text font-display text-xl font-semibold">
              Where do we send the blueprint?
            </h2>
            <div className="mt-6 space-y-5">
              <TextField label="Name" name="name" required autoComplete="name" />
              <TextField label="Email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" type="button" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Transmitting…" : "Send configuration"}
              </Button>
            </div>
            {status === "error" && (
              <p className="mt-4 text-xs text-err" role="alert">
                Transmission failed — email us at {site.email}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

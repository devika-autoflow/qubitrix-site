import { useState, type FormEvent } from "react";
import { TextField, TextArea } from "../../components/ui/Field";
import Button from "../../components/ui/Button";
import { site } from "../../content/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * General enquiry path (Calendly handles scheduled calls; this is the catch-all
 * "reach us" form): POST to the n8n webhook when configured, mailto fallback otherwise.
 * No auth, no accounts.
 */
export default function BookingForm({ source = "contact" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? ""))
      errs.email = "Please use a valid email.";
    if (!data.message?.trim()) errs.message = "Let us know what you need.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const payload = {
      type: "contact",
      source,
      submittedAt: new Date().toISOString(),
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
        if (!res.ok) throw new Error(`webhook ${res.status}`);
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
    } else {
      // mailto fallback — still a working lead path with zero config
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "—"}\n\nMessage:\n${data.message || "—"}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Enquiry — Qubitrix"
      )}&body=${body}`;
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[280px] flex-col items-start justify-center" role="status">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-ok">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          REQUEST RECEIVED
        </span>
        <p className="metal-text font-display mt-4 text-2xl font-semibold">
          We'll reply within 24 hours.
        </p>
        <p className="mt-3 text-sm text-silver-400">
          Thanks for reaching out — we've got your message.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" autoComplete="name" error={errors.name} />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <TextField
        label="Phone (optional)"
        name="phone"
        type="tel"
        autoComplete="tel"
      />
      <TextArea
        label="Message"
        name="message"
        placeholder="Tell us what you need, or just say hello"
        error={errors.message}
      />
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button variant="primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Transmitting…" : "Send message"}
        </Button>
        {status === "error" && (
          <p className="text-xs text-err" role="alert">
            Transmission failed — email us at {site.email}
          </p>
        )}
      </div>
    </form>
  );
}

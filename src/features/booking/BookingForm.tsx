import { useState, type FormEvent } from "react";
import { TextField, TextArea, SelectField } from "../../components/ui/Field";
import Button from "../../components/ui/Button";
import { site } from "../../content/site";

type Status = "idle" | "sending" | "sent" | "error";

const TIMEWASTERS = [
  "Customer support",
  "Lead generation",
  "Data entry & admin",
  "Content",
  "Other",
];

/**
 * Primary conversion path (plan §13): POST to the n8n webhook when configured,
 * mailto fallback otherwise. No auth, no accounts.
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
    if (!data.timewaster) errs.timewaster = "Pick the closest match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const payload = {
      type: "booking",
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
        `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\nBiggest time-waster: ${data.timewaster}\n\nNotes:\n${data.goal || "—"}`
      );
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Strategy call request — Qubitrix"
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
          Your free 30-minute consultation is one email away.
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
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company (optional)" name="company" autoComplete="organization" />
        <SelectField
          label="Your biggest time-waster?"
          name="timewaster"
          options={TIMEWASTERS}
          placeholder="Select the closest match"
          error={errors.timewaster}
        />
      </div>
      <TextArea
        label="Anything else? (optional)"
        name="goal"
        placeholder="Tell us what you're building, or just say hello"
      />
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button variant="primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Transmitting…" : "Book my free strategy call"}
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

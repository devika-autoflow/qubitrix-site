/**
 * Global site facts. Every contact detail lives here — swap once, updates everywhere.
 * TODO(owner): replace placeholder values marked below before launch.
 */
export const site = {
  name: "QUBITRIX",
  domain: "https://qubitrixai.com",
  tagline: "Intelligence, engineered.",
  subline:
    "An AI engineering studio. We build agents, automation, and custom AI systems that run your business around the clock.",

  // TODO(owner): switch to hello@qubitrixai.com when the mailbox exists
  email: "devikaraj5885@gmail.com",

  // TODO(owner): add WhatsApp number in international format, e.g. "+91XXXXXXXXXX"
  whatsapp: "",

  hours: "Mon–Sun · 9:00–21:00 IST",
  location: "Remote · Worldwide",

  linkedin: "https://www.linkedin.com/in/devika-nr-b84010369/",

  /** n8n webhook for lead submissions (set VITE_N8N_WEBHOOK_URL in env). */
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined,

  /** Calendly booking link (set VITE_CALENDLY_URL in env). */
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL as string | undefined,
} as const;

export const nav = [
  { label: "System", href: "#capabilities" },
  { label: "Lab", href: "#lab" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
] as const;

export const sections = [
  { index: "01", id: "hero", label: "Qubitrix" },
  { index: "02", id: "shift", label: "The Shift" },
  { index: "03", id: "capabilities", label: "Capabilities" },
  { index: "04", id: "lab", label: "Lab" },
  { index: "05", id: "work", label: "Work" },
  { index: "06", id: "process", label: "Process" },
  { index: "07", id: "contact", label: "Contact" },
] as const;

/**
 * Global site facts. Every contact detail lives here — swap once, updates everywhere.
 * TODO(owner): replace placeholder values marked below before launch.
 */
export const site = {
  name: "QUBITRIX",
  domain: "https://qubitrixai.com",
  tagline: "The next state of intelligence.",
  /** Hero headline, one entry per display line. */
  heroHeadline: ["The next state", "of intelligence"],
  heroKicker: "AI ENGINEERING STUDIO",
  subline:
    "An AI engineering studio building from first principles — agents, automation, and custom AI systems that work while the world sleeps.",

  email: "devika@qubitrixai.com",

  // TODO(owner): add WhatsApp number in international format, e.g. "+91XXXXXXXXXX"
  whatsapp: "" as string,

  hours: "Mon–Sun · 9:00–21:00 IST",
  location: "Remote · Worldwide",

  linkedin: "https://www.linkedin.com/in/devika-nr-b84010369/",

  /** Social channels — shown in Contact and Footer. */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/qubitrixai/" },
    { label: "Instagram", href: "https://www.instagram.com/qubitrix/" },
    { label: "X / Twitter", href: "https://x.com/qubitrixai" },
  ],

  /** n8n webhook for lead submissions (set VITE_N8N_WEBHOOK_URL in env). */
  webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined,

  /** n8n webhook that powers the chat console (set VITE_CHAT_WEBHOOK_URL in env). */
  chatWebhookUrl: import.meta.env.VITE_CHAT_WEBHOOK_URL as string | undefined,

  /** Calendly booking link (set VITE_CALENDLY_URL in env). */
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL as string | undefined,
} as const;

export const nav = [
  { label: "About", href: "#shift" },
  { label: "Services", href: "#capabilities" },
  { label: "Active Stack", href: "#lab" },
  { label: "Portfolio", href: "#work" },
  { label: "Process", href: "#process" },
] as const;

export const sections = [
  { index: "01", id: "hero", label: "Qubitrix" },
  { index: "02", id: "shift", label: "The Shift" },
  { index: "03", id: "capabilities", label: "Capabilities" },
  { index: "04", id: "lab", label: "Active Stack" },
  { index: "05", id: "work", label: "Work" },
  { index: "06", id: "process", label: "Process" },
  { index: "07", id: "testimonials", label: "Signals" },
  { index: "08", id: "contact", label: "Contact" },
] as const;

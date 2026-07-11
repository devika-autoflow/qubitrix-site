/**
 * Global site facts. Every contact detail lives here — swap once, updates everywhere.
 * TODO(owner): replace placeholder values marked below before launch.
 */
export const site = {
  name: "QUBITRIX",
  domain: "https://qubitrixai.com",
  tagline: "The next state of intelligence.",
  /** Hero headline, one entry per display line. */
  heroHeadline: ["Your Business,", "Running on Autopilot"],
  heroKicker: "NEXT-GENERATION AI AUTOMATION",
  subline:
    "We build intelligent AI systems that work 24/7. From answering customers to finding leads and handling operations. You save thousands every month, and your business runs smoothly while you sleep.",
  heroCtaPrimary: "Book a Free Strategy Call",
  heroCtaSecondary: "See Our Pricing & ROI",
  /** Footer brand line. */
  footerLine: "Pioneering the physics of business automation.",

  email: "info@qubitrixai.com",

  // TODO(owner): add WhatsApp number in international format, e.g. "+91XXXXXXXXXX"
  whatsapp: "" as string,

  hours: "Mon–Sun · 9:00–21:00 IST",
  location: "Remote · Worldwide",

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

/** The 8 sections of the site, in order. Nav and rail derive from this. */
export const nav = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#capabilities" },
  { label: "Financial Impact", href: "#impact" },
  { label: "Quantum Edge", href: "#edge" },
  { label: "Process", href: "#process" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
] as const;

export const sections = [
  { index: "01", id: "hero", label: "Home" },
  { index: "02", id: "capabilities", label: "Services" },
  { index: "03", id: "impact", label: "Financial Impact" },
  { index: "04", id: "edge", label: "Quantum Edge" },
  { index: "05", id: "process", label: "Process" },
  { index: "06", id: "proof", label: "Proof" },
  { index: "07", id: "faq", label: "FAQ" },
  { index: "08", id: "contact", label: "Contact" },
] as const;

/**
 * The Financial Impact table — the true cost of hiring humans vs the
 * savings a managed Qubitrix system unlocks. We deliberately never publish
 * an exact Qubitrix price here: every deployment is scoped to the business,
 * so the real number is mapped on a call, not guessed on a webpage.
 * Figures are an illustrative market comparison (see `footnote`), NOT client
 * claims — keep it that way per the no-fabricated-stats rule.
 */
export interface ImpactRow {
  role: string;
  /** Typical fully-loaded human cost per year (salary + overhead). */
  human: number;
  /** Internal only — used to compute the savings %, never rendered. */
  ai: number;
  savings: number;
}

export const impactIntro = {
  kicker: "THE BIG SAVINGS TABLE",
  heading: "The Real Cost of Doing It the Old Way",
  sub: "Every role below is money you're already spending. See what it costs to hire humans for it — and how much of that Qubitrix gives back.",
};

export const impactRows: ImpactRow[] = [
  { role: "24/7 Customer Support", human: 48000, ai: 6000, savings: 42000 },
  { role: "Sales & Lead Follow-up", human: 65000, ai: 9000, savings: 56000 },
  { role: "Data Entry & Admin", human: 40000, ai: 4500, savings: 35500 },
  { role: "Content & Marketing Ops", human: 55000, ai: 7500, savings: 47500 },
  { role: "Appointment Scheduling & Reminders", human: 32000, ai: 4000, savings: 28000 },
  { role: "Inventory & Order Management", human: 46000, ai: 6000, savings: 40000 },
];

export const impactTotal: ImpactRow = {
  role: "TOTAL ANNUAL COST",
  human: 286000,
  ai: 37000,
  savings: 249000,
};

export const impactColumns = {
  role: "The Role",
  human: "Cost of Hiring Humans",
  savings: "What Qubitrix Gives Back",
};

export const impactBanner =
  "That's $249,000+ a year, sitting in roles Qubitrix can run for a fraction of the cost. Your exact number depends on your business — which is exactly what the call is for.";

export const impactFootnote =
  "Illustrative comparison based on typical U.S. salary benchmarks for full-time roles. Qubitrix pricing is never one-size-fits-all — your exact cost and savings are mapped live on the strategy call.";

export const impactCta = {
  kicker: "THE RIGHT INVESTMENT",
  heading: "Every Transformation Begins with the Right Investment.",
  text: "Every organization has unique objectives, workflows, and growth ambitions. Our solutions are tailored to your business, delivering a strategic roadmap and a customized investment proposal designed for measurable impact.",
  button: "Book a Free Strategy Call",
};

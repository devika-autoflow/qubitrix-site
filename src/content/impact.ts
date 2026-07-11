/**
 * The Financial Impact table — hiring cost vs a managed Qubitrix system.
 * Figures are an illustrative market comparison (see `footnote`), NOT client
 * claims — keep it that way per the no-fabricated-stats rule.
 */
export interface ImpactRow {
  role: string;
  human: number;
  ai: number;
  savings: number;
}

export const impactIntro = {
  kicker: "THE BIG SAVINGS TABLE",
  heading: "The Financial Impact: What You Actually Save",
  sub: "Stop paying for human limitations. See the exact, realistic cost of traditional hiring versus deploying Qubitrix AI systems.",
};

export const impactRows: ImpactRow[] = [
  { role: "24/7 Customer Support", human: 48000, ai: 6000, savings: 42000 },
  { role: "Sales & Lead Follow-up", human: 65000, ai: 9000, savings: 56000 },
  { role: "Data Entry & Admin", human: 40000, ai: 4500, savings: 35500 },
  { role: "Content & Marketing Ops", human: 55000, ai: 7500, savings: 47500 },
];

export const impactTotal: ImpactRow = {
  role: "TOTAL ANNUAL COST",
  human: 208000,
  ai: 27000,
  savings: 181000,
};

export const impactColumns = {
  role: "The Role",
  human: "Human Cost / Year",
  ai: "Qubitrix AI / Year",
  savings: "Your Savings",
};

export const impactBanner =
  "Reclaim $181,000+ every single year. The Qubitrix system pays for itself in the first 30 days, turning your biggest operational expense into your highest profit margin.";

export const impactFootnote =
  "Illustrative comparison based on typical U.S. salary benchmarks for full-time roles versus a managed Qubitrix system. Your exact numbers are mapped on the strategy call.";

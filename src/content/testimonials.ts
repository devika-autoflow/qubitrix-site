/**
 * PLACEHOLDER testimonials (user decision 2026-07-07):
 * 3 short text-only quotes, first-name attribution, no metrics claimed.
 * Swap with real client words here — nothing else needs to change.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood the problem faster than teams we'd worked with for years.",
    name: "Arjun",
    role: "Agency founder",
  },
  {
    quote:
      "The automation quietly does the work of a hire we no longer needed to make.",
    name: "Priya",
    role: "Operations lead",
  },
  {
    quote: "Clear thinking, fast delivery, and it just keeps running.",
    name: "Daniel",
    role: "Marketing director",
  },
];

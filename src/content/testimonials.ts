/**
 * Testimonials — quotes supplied by the owner in the website guide
 * (July 2026). Swap here when real client words land; nothing else changes.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Before Qubitrix, we were spending $4,000/month on manual tasks that now run automatically. ROI was visible in the first month.",
    name: "Priya S.",
    role: "Operations Lead",
  },
  {
    quote:
      "We'd worked with 3 AI agencies before. None of them understood our business. Qubitrix understood the problem in the first call. They're not just tech people—they get business.",
    name: "Arjun M.",
    role: "Founder",
  },
  {
    quote:
      "Clear thinking, fast delivery, and it just keeps running. Our content engine has published 200+ posts without a single issue. It's like having a marketing team that never sleeps.",
    name: "Daniel T.",
    role: "Marketing Director",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const faqIntro = {
  kicker: "FAQ",
  heading: "Frequently Asked Questions",
  sub: "Everything you need to know before we start automating your business.",
};

export const faqItems: FaqItem[] = [
  {
    q: "Do I need to be technical to use these AI systems?",
    a: "Not at all. We handle 100% of the technical setup, coding, and integration. You just tell us what business problem you want to solve, and we build the solution.",
  },
  {
    q: "How long does it take to build and launch an AI system?",
    a: "Most standard systems are designed, built, and launched within 2 to 4 weeks. Highly complex custom systems may take 4 to 6 weeks. We give you a strict timeline before we start.",
  },
  {
    q: "Is my business data safe and secure?",
    a: "Absolutely. We use enterprise-grade security protocols. Your data is fully encrypted, and you retain 100% ownership and control of your data at all times.",
  },
  {
    q: "What happens if the AI makes a mistake?",
    a: "Our systems are built with human-in-the-loop fail-safes. If the AI encounters a situation it isn't fully confident about, it automatically pauses and routes the task to a human on your team for approval.",
  },
  {
    q: "Can I cancel my subscription at any time?",
    a: "Yes. We don't believe in locking clients into long-term contracts. You can cancel your monthly subscription at any time with a simple 30-day notice.",
  },
];

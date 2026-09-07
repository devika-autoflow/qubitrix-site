export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  sections: Array<{ heading: string; body: string }>;
}

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "July 2026",
    sections: [
      {
        heading: "What we collect",
        body: "When you contact us or request a consultation, we collect the details you submit: name, email, company, and your message. Nothing more is collected without your action.",
      },
      {
        heading: "How we use it",
        body: "Your details are used solely to respond to your request and deliver services you ask for. We do not sell or share your information with third parties for marketing.",
      },
      {
        heading: "AI assistant conversations",
        body: "Messages sent to the on-site assistant are processed by an AI provider to generate replies. Do not share sensitive personal information in the chat.",
      },
      {
        heading: "Your rights",
        body: "You may request access to, correction of, or deletion of your personal information at any time by emailing us.",
      },
      {
        heading: "Facebook and Social Media Integrations",
        body: "If you connect with us through Facebook or use any Qubitrix app that integrates with Facebook, we may receive basic profile information that Facebook shares with connected apps (such as your name and profile ID). We use this solely to provide the service you requested. We do not store Facebook data beyond what is required to operate the service.",
      },
      {
        heading: "Data Deletion",
        body: "You may request deletion of any personal data we hold about you at any time. To submit a deletion request:\n\n1. Email hello@qubitrixai.com with the subject line \"Data Deletion Request\"\n2. Include your name and the email address or Facebook account associated with your request\n3. We will process your request within 30 days and confirm via email\n\nIf you connected a Facebook account to any Qubitrix app, you can also remove the app directly from Facebook by going to: Settings → Security and Login → Apps and Websites → find Qubitrix → click Remove.\n\nThis removes Facebook's connection to the app immediately.",
      },
      {
        heading: "Cookies",
        body: "This website uses no tracking cookies. Any functional cookies used are strictly necessary for the site to operate and contain no personal data.",
      },
      {
        heading: "Contact",
        body: "For any privacy-related questions or requests, contact us at hello@qubitrixai.com",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "July 2026",
    sections: [
      {
        heading: "Services",
        body: "Qubitrix provides AI consulting, automation, and custom software development. Scope, fees, and timelines for each engagement are agreed in writing before work begins.",
      },
      {
        heading: "Fees",
        body: "All fees are quoted in USD unless otherwise specified, and are due as agreed in the project proposal.",
      },
      {
        heading: "Intellectual property",
        body: "On full payment, deliverables built for you are yours. Pre-existing tools, frameworks, and know-how remain ours.",
      },
      {
        heading: "Liability",
        body: "Services are provided with professional care. To the maximum extent permitted by law, our liability is limited to fees paid for the engagement concerned.",
      },
      {
        heading: "Changes",
        body: "We may update these terms; material changes will be reflected on this page with a new date.",
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "July 2026",
    sections: [
      {
        heading: "What we use",
        body: "This site uses no advertising or cross-site tracking cookies. Local storage may hold anonymous preferences (such as dismissing UI hints).",
      },
      {
        heading: "Analytics",
        body: "If privacy-friendly analytics are enabled, they collect aggregate, anonymized usage data only.",
      },
    ],
  },
];

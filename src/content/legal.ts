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
    updated: "September 2026",
    sections: [
      {
        heading: "Who we are",
        body: "Qubitrix is an AI automation agency operating from India and serving clients worldwide. For anything in this policy — access, correction, deletion, or a complaint — write to info@qubitrixai.com. We are the data controller for the information described below.",
      },
      {
        heading: "What we collect",
        body: "Contact and consultation forms: the name, email, company, and message you submit. On-site assistant: the messages you type, plus a per-tab session id. Account sign-in: your email address and authentication tokens. With your consent only: a persistent visitor id that recognises you across visits. We collect nothing else, and we never collect special-category data.",
      },
      {
        heading: "Why we may use it (legal basis)",
        body: "To answer your enquiry and prepare a proposal — necessary for steps taken at your request before a contract. To operate your account and deliver agreed services — performance of a contract. To keep the site secure and prevent abuse — our legitimate interest. To recognise returning visitors and improve the site — your consent, which you may withdraw at any time from the Cookie preferences link in the footer.",
      },
      {
        heading: "Who processes it for us",
        body: "Netlify (hosting and delivery), Supabase (accounts and database), n8n on our own infrastructure (form and conversation routing), Anthropic or Google (generating assistant replies), and Calendly (scheduling calls you book). Each acts on our instructions under a processing agreement. We never sell your information or share it for third-party marketing.",
      },
      {
        heading: "International transfers",
        body: "Some of these providers process data outside your country, including in the United States. Where that applies to personal data protected by UK or EU law, the transfer relies on the European Commission's Standard Contractual Clauses or an adequacy decision.",
      },
      {
        heading: "How long we keep it",
        body: "Enquiries and consultation requests: up to 24 months from your last contact, then deleted. Assistant conversations: up to 12 months. Account data: for as long as your account exists, and deleted within 30 days of you closing it. Records we must keep for tax or accounting are retained for the period the law requires.",
      },
      {
        heading: "AI assistant conversations",
        body: "Messages sent to the on-site assistant are transmitted to an AI provider to generate a reply. Please do not share passwords, payment details, or other sensitive personal information in the chat.",
      },
      {
        heading: "Your rights",
        body: "You may request access to your personal information, correction of anything inaccurate, deletion, a portable copy, restriction of processing, or object to processing based on our legitimate interests. Email info@qubitrixai.com and we will respond within one month. If you are in the UK or EEA and are unhappy with our response, you may complain to your national data protection authority.",
      },
      {
        heading: "Facebook and Social Media Integrations",
        body: "If you connect with us through Facebook or use any Qubitrix app that integrates with Facebook, we may receive basic profile information that Facebook shares with connected apps (such as your name and profile ID). We use this solely to provide the service you requested. We do not store Facebook data beyond what is required to operate the service.",
      },
      {
        heading: "Data Deletion",
        body: "You may request deletion of any personal data we hold about you at any time. To submit a deletion request:\n\n1. Email info@qubitrixai.com with the subject line \"Data Deletion Request\"\n2. Include your name and the email address or Facebook account associated with your request\n3. We will process your request within 30 days and confirm via email\n\nIf you connected a Facebook account to any Qubitrix app, you can also remove the app directly from Facebook by going to: Settings → Security and Login → Apps and Websites → find Qubitrix → click Remove.\n\nThis removes Facebook's connection to the app immediately.",
      },
      {
        heading: "Cookies and local storage",
        body: "This site uses no advertising or tracking cookies. Storage that is strictly necessary to run the site is always active; one optional item is stored only if you accept it on the cookie banner. Every item is listed individually, with its purpose and lifetime, in our Cookie Policy.",
      },
      {
        heading: "Contact",
        body: "For any privacy-related questions or requests, contact us at info@qubitrixai.com",
      },
      {
        heading: "Changes to this policy",
        body: "We update this page when our practices change and revise the date above. Material changes also re-prompt the cookie banner so your consent stays current.",
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
    updated: "September 2026",
    sections: [
      {
        heading: "What we use",
        body: "This site sets no advertising cookies and takes part in no cross-site tracking. What we do store falls into two groups: strictly necessary storage, which is always active, and one optional item that is only stored if you accept it.",
      },
      {
        heading: "Strictly necessary (always active)",
        body: "qx-session-id — a random id held in sessionStorage that ties together a single visit so the assistant can follow the thread; it is erased when you close the tab. qx-consent — records the choice you made on the cookie banner, so we do not ask again; it lasts until you clear it or we materially change this policy. sb-* auth tokens — set by Supabase when you sign in, so you stay signed in between visits; they last until you sign out or the session expires. None of these can be switched off without breaking the site.",
      },
      {
        heading: "Optional — only with your consent",
        body: "qx-user-id — a random id held in localStorage that recognises you as the same visitor across separate visits, and is sent with your messages so a returning conversation has context. It is stored only if you choose Accept, it contains no name or email, and choosing Reject deletes it immediately. It persists until you clear your browser storage or withdraw consent.",
      },
      {
        heading: "Changing your mind",
        body: "Use the Cookie preferences link in the footer to bring the banner back and make a different choice. Withdrawing consent erases the optional id straight away. You can also clear this site's storage from your browser settings at any time.",
      },
      {
        heading: "Analytics",
        body: "We currently run no third-party analytics scripts. If we add analytics, we will use a privacy-friendly, server-side or aggregate-only tool, and we will update this page before doing so.",
      },
    ],
  },
];

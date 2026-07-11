export interface Service {
  slug: string;
  title: string;
  /** One line. ≤ 12 words. */
  value: string;
  /** Mono spec chips. */
  tags: string[];
  dossier: {
    what: string;
    deliverables: string[];
    stack: string[];
    timeline: string;
  };
}

export const capabilitiesIntro = {
  kicker: "WHAT WE PROVIDE",
  heading: "Complete AI Solutions for Your Business",
  sub: "We don't just give you software. We build custom AI systems that do the work of full-time employees.",
};

export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Employees",
    value: "Tireless workers that read emails, process orders, and make decisions based on your rules.",
    tags: ["ORCHESTRATION", "TOOL USE", "MULTI-STEP"],
    dossier: {
      what: "Agents that own a job end-to-end — researching, qualifying, drafting, and executing across your tools without a human in the loop.",
      deliverables: [
        "Agent architecture and prompt system",
        "Tool and API integrations",
        "Guardrails, logging, and fallbacks",
        "Handover documentation",
      ],
      stack: ["Claude / GPT / Gemini", "n8n", "Custom TypeScript"],
      timeline: "2–4 weeks per agent",
    },
  },
  {
    slug: "ai-chatbots",
    title: "24/7 Support",
    value: "Instantly answer customers on WhatsApp, IG, and web. Never miss a message.",
    tags: ["RAG", "MULTICHANNEL", "HANDOFF"],
    dossier: {
      what: "Conversational AI trained on your business — website, WhatsApp, and email — that resolves queries and books calls while you sleep.",
      deliverables: [
        "Knowledge-grounded chatbot (RAG)",
        "Website + WhatsApp deployment",
        "Human-handoff and escalation rules",
        "Conversation analytics",
      ],
      stack: ["Claude / Gemini", "Vector search", "n8n"],
      timeline: "1–3 weeks",
    },
  },
  {
    slug: "automation",
    title: "Business Automation",
    value: "Automate invoices, lead routing, and daily operations. Eliminate busywork.",
    tags: ["N8N", "INTEGRATIONS", "PIPELINES"],
    dossier: {
      what: "End-to-end automation of the repetitive work — lead capture, follow-ups, reporting, scraping, content pipelines — wired across the tools you already use.",
      deliverables: [
        "Mapped and rebuilt workflows",
        "Integrations across your stack",
        "Error handling and alerting",
        "Monitoring dashboard",
      ],
      stack: ["n8n", "Make", "APIs", "Google Workspace"],
      timeline: "1–2 weeks per workflow",
    },
  },
  {
    slug: "lead-generation",
    title: "AI Lead Gen",
    value: "Find, score, and warm up potential clients. Auto-book meetings on your calendar.",
    tags: ["OUTREACH", "SCORING", "CRM"],
    dossier: {
      what: "Autonomous prospecting: scraping and enriching leads, scoring them against your ideal customer profile, and running personalized outreach that books calls onto your calendar.",
      deliverables: [
        "Lead sourcing and enrichment pipeline",
        "ICP scoring model and routing",
        "Personalized outreach sequences",
        "CRM sync and reporting",
      ],
      stack: ["n8n", "Scraping APIs", "LLM scoring", "CRM integrations"],
      timeline: "2–3 weeks",
    },
  },
  {
    slug: "content-engines",
    title: "Content Engine",
    value: "Blogs, newsletters, and social posts researched, written, and published on autopilot.",
    tags: ["CONTENT", "CAMPAIGNS", "DISTRIBUTION"],
    dossier: {
      what: "Systems that curate sources, draft content in your voice, route it through your approval, and publish across channels — newsletters, social, and ad campaign variants.",
      deliverables: [
        "Curation and drafting pipeline",
        "Voice and style tuning",
        "Approval flow and scheduler",
        "Multi-channel distribution",
      ],
      stack: ["n8n", "LLM drafting", "RSS/email APIs", "Social APIs"],
      timeline: "2–3 weeks",
    },
  },
  {
    slug: "custom-ai",
    title: "Custom AI",
    value: "Have a unique bottleneck? We build bespoke AI tools tailored exactly to your workflow.",
    tags: ["BESPOKE", "PIPELINES", "EVALS"],
    dossier: {
      what: "When a template won't cut it: custom data pipelines, evaluation harnesses, fine-tuned behaviors, and AI products designed around your exact constraints.",
      deliverables: [
        "System design and architecture",
        "Custom development and integration",
        "Evaluation and quality gates",
        "Maintenance plan",
      ],
      stack: ["Python / TypeScript", "Claude API", "Cloud functions"],
      timeline: "Scoped per project",
    },
  },
];

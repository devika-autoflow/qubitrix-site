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

export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    value: "Autonomous systems that reason, decide, and act.",
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
    title: "AI Chatbots",
    value: "Support and sales that answer in seconds, 24/7.",
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
    title: "Workflow Automation",
    value: "Your operations, running while you sleep.",
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
    slug: "custom-ai",
    title: "Custom AI Systems",
    value: "Purpose-built AI for problems off the shelf can't touch.",
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

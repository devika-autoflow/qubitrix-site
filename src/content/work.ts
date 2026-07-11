/**
 * Selected builds & demos — real systems, honestly framed (plan §3).
 * Add client case studies here as they land; the UI adapts automatically.
 */
export interface WorkItem {
  slug: string;
  index: string;
  title: string;
  /** One-line outcome. */
  outcome: string;
  kind: "SYSTEM" | "PIPELINE" | "ENGINE";
  stack: string[];
  problem: string;
  build: string;
  result: string;
  /** Screenshots shown on the detail page (paths under /public). */
  images?: Array<{ src: string; alt: string }>;
}

export const workIntro = {
  kicker: "PROOF",
  heading: "Real Results. Real ROI.",
  sub: "Don't just take our word for the math. See how these systems transform operations and save thousands for businesses like yours.",
};

export const work: WorkItem[] = [
  {
    slug: "student-guide-whatsapp-bot",
    index: "W-01",
    title: "Student Guide WhatsApp Bot",
    outcome: "Every student guided, tracked, and analyzed — from one WhatsApp number.",
    kind: "SYSTEM",
    stack: ["n8n", "WhatsApp API", "Supabase", "Google Sheets", "KPI dashboard"],
    problem:
      "Guiding hundreds of students one-on-one over WhatsApp means scripts followed inconsistently, conversations lost, and zero visibility into who converted.",
    build:
      "An incoming WhatsApp message drives a scripted guidance flow. Every conversation updates a Google Sheet with each student's latest state and syncs to a Supabase backend — all surfaced live in a KPI dashboard: signups by stream, the full funnel from link click to conversion, engagement, and completion rates.",
    result:
      "A self-running student pipeline. Staff watch one dashboard instead of a thousand chats — sessions, replies, and conversions counted in real time.",
    images: [
      { src: "/work/student-whatsapp-bot-flow.png", alt: "n8n workflow orchestrating the student guide WhatsApp bot" },
      { src: "/work/student-whatsapp-bot-dashboard.png", alt: "KPI dashboard: signups, WhatsApp funnel, engagement and completion stats" },
    ],
  },
  {
    slug: "cv-intake-pipeline",
    index: "W-02",
    title: "CV Intake & Candidate Extraction",
    outcome: "Resumes from inbox to searchable database — zero manual processing.",
    kind: "PIPELINE",
    stack: ["Gmail", "Google Drive", "OCR", "AI extraction", "Google Sheets"],
    problem:
      "Hiring teams drown in email attachments: CVs in every format, details typed out by hand, and no single place to search the pipeline.",
    build:
      "The pipeline watches the recruitment inbox, files every CV into structured Drive folders, converts any format to PDF, reads it with OCR, and uses AI to extract name, email, phone, age, and address into a clean candidate database with file links.",
    result:
      "A clean, searchable candidate pipeline that assembles itself — every incoming CV becomes a structured record with the source file one click away.",
    images: [
      { src: "/work/cv-intake-flow.png", alt: "Automation flow: Gmail intake, Drive filing, OCR, AI extraction to Sheets" },
    ],
  },
  {
    slug: "instagram-dm-engine",
    index: "W-03",
    title: "Instagram DM Engagement Engine",
    outcome: "Every DM answered instantly; every silent lead followed up automatically.",
    kind: "ENGINE",
    stack: ["ManyChat", "n8n", "AI replies", "Webhooks"],
    problem:
      "DMs are where leads die: replies come hours late, follow-ups never happen, and every missed conversation is a missed customer.",
    build:
      "ManyChat captures each incoming message and hands it to n8n, where AI reads intent and context and replies in seconds. If the user goes quiet, timed follow-ups fire with customized messages — and stop the moment they respond.",
    result:
      "An always-on engagement loop: instant personalized replies, automatic follow-ups, and more conversations converting — with zero manual DM handling.",
    images: [
      { src: "/work/instagram-dm-flow.png", alt: "ManyChat flow powering AI replies and timed follow-ups" },
    ],
  },
  {
    slug: "ai-request-processing",
    index: "W-04",
    title: "AI Request Processing + Vector Memory",
    outcome: "Internal requests processed, validated, and answered — and the system learns.",
    kind: "SYSTEM",
    stack: ["n8n", "LLM analysis", "Vector database", "Human-in-loop"],
    problem:
      "Manual request handling doesn't scale: repetitive admin work, inconsistent responses, and edge cases that slip through unnoticed.",
    build:
      "Incoming requests are parsed from messages and attachments, classified by AI, and validated against internal records. Decision logic routes valid, mismatched, and missing-data cases; responses are generated in context, and every interaction is embedded into a vector database so the system remembers and improves. Edge cases fall back to a human.",
    result:
      "A production internal-operations engine with full audit logs — consistent responses at scale that get sharper with every request handled.",
    images: [
      { src: "/work/request-processing-flow.png", alt: "AI request processing workflow with validation and routing" },
      { src: "/work/request-processing-memory.png", alt: "Vector memory pipeline storing requests and responses as embeddings" },
    ],
  },
  {
    slug: "website-copywriting-engine",
    index: "W-05",
    title: "Website Copywriting Engine",
    outcome: "A full website's copy drafted, unified, and delivered to Notion.",
    kind: "ENGINE",
    stack: ["n8n", "Notion", "Web extraction", "LLM drafting"],
    problem:
      "Website copy stalls launches: research, tone, structure, and consistency across every page — done by hand, it takes weeks.",
    build:
      "The engine pulls business context from Notion, extracts the client's existing site content, structures requirements page by page, drafts conversion-focused copy for each, checks the whole set for coherence, and files the finished content back into Notion ready for design.",
    result:
      "Launch-ready, on-brand copy for every page in a fraction of the time — consistent messaging from the home page to the last FAQ.",
    images: [
      { src: "/work/copywriting-flow.png", alt: "n8n copywriting workflow: extract, structure, draft, coherence-check, publish to Notion" },
    ],
  },
];

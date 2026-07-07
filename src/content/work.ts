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
}

export const workIntro = {
  kicker: "SELECTED BUILDS",
  heading: "Systems we've shipped.",
  sub: "Working automations and AI systems from our own stack — the same machinery we deploy for clients.",
};

export const work: WorkItem[] = [
  {
    slug: "competitor-research-engine",
    index: "W-01",
    title: "Competitor Research Engine",
    outcome: "Market intelligence gathered, summarized, and delivered autonomously.",
    kind: "ENGINE",
    stack: ["n8n", "LLM analysis", "Web scraping", "Google Sheets"],
    problem:
      "Staying current on competitors means hours of manual reading every week — so it simply doesn't happen.",
    build:
      "An autonomous pipeline that monitors competitor sites and channels, extracts what changed, runs LLM analysis over it, and files a structured brief.",
    result:
      "Continuous market awareness with zero recurring effort. Research that used to take a day arrives as a morning summary.",
  },
  {
    slug: "job-market-scraper",
    index: "W-02",
    title: "Job Market Scraper",
    outcome: "Hundreds of listings qualified into one clean sheet, on schedule.",
    kind: "PIPELINE",
    stack: ["n8n", "Scraping APIs", "LLM filtering", "Google Sheets"],
    problem:
      "Relevant opportunities are scattered across boards and buried in noise; manual search wastes hours and misses postings.",
    build:
      "A scheduled scraper that sweeps multiple boards, deduplicates, uses an LLM to score relevance against target criteria, and exports ranked results.",
    result:
      "A live, ranked opportunity sheet that refreshes itself — no tabs, no copy-paste, no missed postings.",
  },
  {
    slug: "newsletter-engine",
    index: "W-03",
    title: "Newsletter Engine",
    outcome: "Content curated, drafted, and scheduled hands-free.",
    kind: "SYSTEM",
    stack: ["n8n", "LLM drafting", "RSS/email APIs"],
    problem:
      "Consistent newsletters die on the operational grind: sourcing, summarizing, formatting, scheduling — every single week.",
    build:
      "A pipeline that collects source material, drafts sections in a controlled brand voice, assembles the issue, and queues it for review and send.",
    result:
      "A newsletter that ships every week for the cost of a five-minute review.",
  },
  {
    slug: "youtube-analysis-pipeline",
    index: "W-04",
    title: "YouTube Analysis Pipeline",
    outcome: "Channels decoded into strategy, automatically.",
    kind: "PIPELINE",
    stack: ["n8n", "YouTube API", "LLM analysis"],
    problem:
      "Understanding why content performs means watching hours of video and guessing at patterns.",
    build:
      "A deployed pipeline that pulls channel and video data, transcribes and analyzes content with LLMs, and surfaces the patterns behind performance.",
    result:
      "Data-backed content strategy from a link — hours of analysis compressed into minutes.",
  },
];

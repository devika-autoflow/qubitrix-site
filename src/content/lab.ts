/**
 * The Lab — the technology domains orbiting every Qubitrix build.
 * This section shows breadth of machinery, not a menu of services
 * (services live in Capabilities). Honest framing (plan §5).
 */
export interface LabThread {
  id: number;
  title: string;
  status: "ACTIVE" | "EXPLORING" | "INCUBATING";
  line: string;
  relatedIds: number[];
}

export const labIntro = {
  kicker: "ACTIVE STACK",
  heading: "The machinery behind every build.",
  sub: "Technology domains in constant orbit around your system — each one battle-tested on real client work before it ships.",
};

export const labThreads: LabThread[] = [
  {
    id: 1,
    title: "LLM Orchestration",
    status: "ACTIVE",
    line: "Claude, GPT, and Gemini routed to whichever model each task deserves.",
    relatedIds: [2, 6],
  },
  {
    id: 2,
    title: "RAG & Memory",
    status: "ACTIVE",
    line: "Retrieval that stays accurate as your data grows messy.",
    relatedIds: [1, 4],
  },
  {
    id: 3,
    title: "Quantum-Inspired Optimization",
    status: "EXPLORING",
    line: "Annealing-style search applied to scheduling and routing.",
    relatedIds: [6],
  },
  {
    id: 4,
    title: "Evals & Guardrails",
    status: "ACTIVE",
    line: "Measuring AI output quality before your customers do.",
    relatedIds: [2, 5],
  },
  {
    id: 5,
    title: "Voice Interfaces",
    status: "INCUBATING",
    line: "Agents you talk to — latency low enough to feel human.",
    relatedIds: [4],
  },
  {
    id: 6,
    title: "Agent Swarms",
    status: "EXPLORING",
    line: "Teams of specialized agents negotiating a shared goal.",
    relatedIds: [1, 3],
  },
];

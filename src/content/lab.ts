/**
 * Qubitrix Lab — applied R&D threads. Honest framing (plan §5):
 * quantum is the metaphor and the ambition, never a hardware claim.
 */
export interface LabThread {
  id: number;
  title: string;
  status: "ACTIVE" | "EXPLORING" | "INCUBATING";
  line: string;
  relatedIds: number[];
}

export const labIntro = {
  kicker: "QUBITRIX LAB",
  heading: "Where we push past current limits.",
  sub: "Open research threads we run between client builds — the ideas that become next year's systems.",
};

export const labThreads: LabThread[] = [
  {
    id: 1,
    title: "Agent Swarms",
    status: "ACTIVE",
    line: "Teams of specialized agents negotiating a shared goal.",
    relatedIds: [2, 6],
  },
  {
    id: 2,
    title: "Eval Harnesses",
    status: "ACTIVE",
    line: "Measuring AI output quality before your customers do.",
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
    title: "RAG Architectures",
    status: "ACTIVE",
    line: "Retrieval that stays accurate as your data grows messy.",
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
    title: "Autonomous Research",
    status: "EXPLORING",
    line: "Systems that read the market and brief you at sunrise.",
    relatedIds: [1, 3],
  },
];

/**
 * Quantum Core journal — short explainers on quantum computing and AI.
 * Educational voice: quantum is ambition and metaphor, never a hardware claim (CLAUDE.md).
 */
export interface BlogPost {
  slug: string;
  index: string;
  title: string;
  tag: "QUANTUM" | "AI" | "SYSTEMS";
  minutes: number;
  excerpt: string;
  /** Body paragraphs, rendered in order. */
  body: string[];
}

export const blogIntro = {
  kicker: "QUANTUM CORE",
  heading: "Field notes from the frontier.",
  sub: "Short, honest explainers on quantum computing, AI systems, and where the two are heading — written for operators, not physicists.",
};

export const blog: BlogPost[] = [
  {
    slug: "quantum-computing-plain-language",
    index: "Q-01",
    title: "Quantum computing, in plain language",
    tag: "QUANTUM",
    minutes: 4,
    excerpt:
      "Qubits, superposition, and entanglement — what they actually mean, without the mysticism.",
    body: [
      "A classical bit is a switch: on or off, one or zero. A qubit is different — until you measure it, it exists in a blend of both states at once. That property is called superposition, and it is the first thing that makes quantum computers unlike anything in your office.",
      "The second property is entanglement. Two entangled qubits behave as a single system: measure one and you instantly know something about the other. Link enough of them together and the machine can represent an enormous space of possibilities simultaneously, instead of checking them one at a time.",
      "The catch is that qubits are fragile. Heat, vibration, even stray electromagnetic noise collapses their state — which is why today's quantum machines live in dilution refrigerators colder than deep space, and why error correction is the central engineering battle of the field.",
      "What should a business owner take from this? Not that quantum will replace your laptop — it won't. It is a specialized engine for specific problem shapes: optimization, simulation of molecules and materials, and certain kinds of search. For everything else, classical computing and AI remain the workhorses.",
    ],
  },
  {
    slug: "quantum-meets-ai",
    index: "Q-02",
    title: "Where quantum meets machine learning",
    tag: "AI",
    minutes: 5,
    excerpt:
      "Quantum machine learning is early but real. Here is what researchers are actually exploring.",
    body: [
      "Machine learning is, at its core, optimization over huge spaces of parameters. Quantum computers are naturally good at exploring huge spaces. The overlap between the two — quantum machine learning — is one of the most active research areas in computing.",
      "Current work centers on a few honest ideas: variational quantum circuits that act like small trainable models, quantum kernels that project data into spaces classical machines struggle to reach, and quantum sampling that could speed up parts of training.",
      "It is early. Today's quantum hardware is noisy and small, and for most practical ML tasks a well-tuned classical model on a GPU still wins decisively. Anyone selling you a 'quantum AI product' today deserves hard questions.",
      "But the direction matters. The lesson of the last decade of AI is that capability curves compound quietly and then arrive suddenly. Watching the quantum-ML frontier now is how you avoid being surprised by it later.",
    ],
  },
  {
    slug: "why-qubitrix-watches-quantum",
    index: "Q-03",
    title: "Why an AI studio watches quantum",
    tag: "SYSTEMS",
    minutes: 3,
    excerpt:
      "Our name is a commitment to the frontier. Here is what that means in practice.",
    body: [
      "Qubitrix takes its name from the qubit deliberately. Not because we run quantum hardware — we don't, and we won't claim to — but because the qubit represents the frontier our work points toward: systems that hold more possibilities than a single fixed answer.",
      "The AI systems we build today — agents, automation pipelines, custom models — are the practical frontier. They are what actually moves a business this year. Quantum is the horizon behind them: a bet on where computation goes next.",
      "In practice, watching quantum shapes how we engineer. We design systems to be model-agnostic and compute-agnostic, so that when new engines arrive — better LLMs this quarter, quantum accelerators someday — the machinery we've built for clients can adopt them instead of being replaced by them.",
      "That is the studio's promise in one line: build on today's frontier, stay ready for the next one.",
    ],
  },
  {
    slug: "agents-run-your-business",
    index: "Q-04",
    title: "What AI agents actually do all day",
    tag: "AI",
    minutes: 4,
    excerpt:
      "Behind the buzzword: how an agent watches, decides, and acts inside a real business.",
    body: [
      "Strip away the hype and an AI agent is a loop: observe something, reason about it, act on it, repeat. What makes it an agent rather than a script is the reasoning step — it handles inputs nobody wrote an if-statement for.",
      "Inside a real business that loop looks mundane and valuable. An agent reads an inbound lead, checks it against your ideal customer profile, drafts a reply in your voice, and books the call. Another watches competitor sites and files a brief when something actually changes.",
      "The engineering that matters is rarely the model. It is the plumbing around it: clean triggers, guardrails on what the agent may do alone, human checkpoints where the stakes are high, and logs you can audit when something looks off.",
      "That is the difference between a demo and a system. Demos reason impressively once. Systems run every hour of every day, quietly, until you forget they were ever a person's job.",
    ],
  },
];

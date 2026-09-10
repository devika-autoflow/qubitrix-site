export interface ProcessStep {
  index: string;
  title: string;
  /** Timeframe chip — owners hate open-ended projects. */
  meta: string;
  line: string;
}

export const processIntro = {
  kicker: "OUR PROCESS",
  heading: "How We Bring Your AI to Life",
  sub: "A simple, transparent process from idea to full automation. No technical skills required on your end.",
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    meta: "FREE 30-MINUTE STRATEGY CALL",
    line: "We analyze your daily operations to find the biggest time-wasters and calculate exactly how much money you can save.",
  },
  {
    index: "02",
    title: "Design",
    meta: "1 WEEK TURNAROUND",
    line: "We blueprint your custom AI system. You see exactly what it will do, how it connects to your tools, and what it costs — before we build anything.",
  },
  {
    index: "03",
    title: "Build & Test",
    meta: "2 TO 4 WEEKS",
    line: "Our engineers build your system and rigorously test it in a secure sandbox. It handles real-world scenarios perfectly before it goes live.",
  },
  {
    index: "04",
    title: "Deploy & Scale",
    meta: "ONGOING SUPPORT",
    line: "We launch your AI, connect it to your daily workflows, and monitor it 24/7. As your business grows, we scale and upgrade the system.",
  },
];

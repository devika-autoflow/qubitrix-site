export interface ProcessStep {
  index: string;
  title: string;
  line: string;
}

export const processIntro = {
  kicker: "PROCESS",
  heading: "From problem to running system.",
};

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Discover", line: "A free 30-minute call. We map where time is bleeding." },
  { index: "02", title: "Design", line: "Architecture and a fixed scope — before any build starts." },
  { index: "03", title: "Build", line: "The system is assembled, integrated, and tested against reality." },
  { index: "04", title: "Deploy", line: "It goes live in your stack, with monitoring from day one." },
  { index: "05", title: "Operate", line: "We maintain, tune, and extend as your business moves." },
];

export const shiftLines = [
  { mono: "STATE 01 — MANUAL", text: "Your team does everything by hand." },
  { mono: "STATE 02 — AUTOMATED", text: "Machines handle the repetition." },
  { mono: "STATE 03 — AUTONOMOUS", text: "Systems decide, act, and improve." },
];

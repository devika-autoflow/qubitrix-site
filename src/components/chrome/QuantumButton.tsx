import { useNavigate } from "react-router-dom";

/** Nav trigger — plain text pill, no icon. Opens the /quantum page. */
export default function QuantumButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/quantum")}
      className="group flex h-9 items-center rounded-full border border-white/10 bg-obsidian-2/70 px-4 transition-colors hover:border-volt/50"
      aria-label="Open Quantum Research — articles on quantum computing and AI"
    >
      <span className="font-mono text-[11px] tracking-[0.14em] text-silver-400 transition-colors group-hover:text-silver-100">
        QUANTUM RESEARCH
      </span>
    </button>
  );
}

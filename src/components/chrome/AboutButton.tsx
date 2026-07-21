import { useNavigate } from "react-router-dom";

/**
 * About Us — nav trigger next to QuantumButton. Opens the /about page
 * (brand story, philosophy, mission, team). Static icon, no motion.
 */
export default function AboutButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/about")}
      className="group flex h-9 items-center gap-2.5 rounded-full border border-white/10 bg-obsidian-2/70 pl-2 pr-4 transition-colors hover:border-volt/50"
      aria-label="About Qubitrix — our story, mission, and team"
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full border border-volt/40"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] leading-none text-volt-tint">Q</span>
      </span>
      <span className="font-mono text-[11px] tracking-[0.14em] text-silver-400 transition-colors group-hover:text-silver-100">
        ABOUT
      </span>
    </button>
  );
}

import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Quantum core — nav trigger styled as a miniature quantum processor
 * (orbiting qubits around a glowing nucleus). Opens the /quantum page.
 */
export default function QuantumButton() {
  const reduced = useReducedMotion();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/quantum")}
      className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-obsidian-2/70 py-1.5 pl-2 pr-4 transition-colors hover:border-volt/50"
      aria-label="Open Quantum Core — articles on quantum computing and AI"
    >
      {/* the core: nucleus + orbiting qubits */}
      <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden="true">
        <span className="absolute h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_10px_var(--color-volt)]" />
        {!reduced && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-volt/40"
              style={{ scaleY: 0.45 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            >
              <span className="absolute -top-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-plasma shadow-[0_0_6px_var(--color-plasma)]" />
            </motion.span>
            <motion.span
              className="absolute inset-0 rounded-full border border-plasma/30"
              style={{ scaleY: 0.45, rotate: 60 }}
              animate={{ rotate: 420 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            >
              <span className="absolute -bottom-[2px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-volt-tint shadow-[0_0_6px_var(--color-volt)]" />
            </motion.span>
          </>
        )}
        {reduced && <span className="absolute inset-0 rounded-full border border-volt/40" />}
      </span>
      <span className="font-mono text-[11px] tracking-[0.14em] text-silver-400 transition-colors group-hover:text-silver-100">
        QUANTUM
      </span>
    </button>
  );
}

import { lazy, Suspense, useState } from "react";

const ConsolePanel = lazy(() => import("./ConsolePanel"));

/**
 * The brand dot, waiting — never interrupting (plan §11).
 * Panel code loads only when opened (lazy chunk, plan §14).
 */
export default function ConsoleLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Qubitrix assistant"
          className="group fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-obsidian-2/90 backdrop-blur-md transition-all duration-300 hover:border-volt/50 hover:shadow-[0_0_32px_rgba(124,107,255,0.35)]"
        >
          <span className="pulse-soft h-3.5 w-3.5 rounded-full bg-volt shadow-[0_0_16px_rgba(124,107,255,0.8)]" />
        </button>
      )}
      {open && (
        <Suspense fallback={null}>
          <ConsolePanel onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

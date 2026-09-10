import { lazy, Suspense, useState } from "react";

const ConsolePanel = lazy(() => import("./ConsolePanel"));

type Status = "closed" | "open" | "minimized";

/**
 * Named and labeled, waiting — never interrupting (plan §11).
 * Panel code loads only when opened (lazy chunk, plan §14).
 *
 * Close (✕) ends the conversation — reopening starts a brand-new session.
 * Minimize (–) hides the panel but keeps it mounted, so the same
 * conversation/session resumes exactly where it left off.
 */
export default function ConsoleLauncher() {
  const [status, setStatus] = useState<Status>("closed");
  // bumping this remounts ConsolePanel, which mints a fresh chatId + greeting
  const [instanceKey, setInstanceKey] = useState(0);

  const openFresh = () => {
    setInstanceKey((k) => k + 1);
    setStatus("open");
  };
  const resume = () => setStatus("open");

  return (
    <>
      {status !== "open" && (
        <button
          onClick={status === "minimized" ? resume : openFresh}
          aria-label={status === "minimized" ? "Resume Qubi, the Qubitrix assistant" : "Open Qubi, the Qubitrix assistant"}
          className="group fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 rounded-full border border-white/10 bg-obsidian-2/90 py-2.5 pl-2.5 pr-5 backdrop-blur-md transition-all duration-300 hover:border-volt/50 hover:shadow-[0_0_32px_rgba(124,107,255,0.35)]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-obsidian-1/70">
            <span className="pulse-soft h-3 w-3 rounded-full bg-volt shadow-[0_0_16px_rgba(124,107,255,0.8)]" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] text-silver-300 transition-colors group-hover:text-silver-100">
            {status === "minimized" ? "CONTINUE CHAT" : "ASK QUBI"}
          </span>
        </button>
      )}
      {status !== "closed" && (
        <Suspense fallback={null}>
          <ConsolePanel
            key={instanceKey}
            hidden={status === "minimized"}
            onClose={() => setStatus("closed")}
            onMinimize={() => setStatus("minimized")}
          />
        </Suspense>
      )}
    </>
  );
}

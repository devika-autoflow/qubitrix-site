import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import QubitrixLogo from "../../components/ui/QubitrixLogo";

/**
 * Shared chrome for every auth screen — a single centered instrument panel
 * on the obsidian field, consistent with the OS identity (no generic card).
 */
export default function AuthShell({
  kicker,
  heading,
  sub,
  children,
}: {
  kicker: string;
  heading: string;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <main
      id="main"
      className="relative flex min-h-screen items-center justify-center px-5 pb-20 pt-36 sm:px-8"
    >
      {/* quiet radial glow — the one energy accent allowed in this viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 420px at 50% 38%, rgba(124,107,255,0.10), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link to="/" aria-label="Back to home">
            <QubitrixLogo markSize={26} />
          </Link>
        </div>

        <div className="btn-aurora-border os-panel rounded-3xl p-7 shadow-[0_0_80px_rgba(124,107,255,0.08)] sm:p-9">
          <p className="hud-label mb-3">{kicker}</p>
          <h1 className="metal-text font-display text-2xl font-semibold tracking-tight">
            {heading}
          </h1>
          {sub && <p className="mt-2.5 text-sm leading-relaxed text-silver-400">{sub}</p>}
          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.14em] text-silver-600">
          SECURED BY SUPABASE AUTH
        </p>
      </div>
    </main>
  );
}

/** Inline status line for auth flows — ok / error tones. */
export function AuthNotice({ tone, children }: { tone: "ok" | "err"; children: ReactNode }) {
  return (
    <p
      role={tone === "err" ? "alert" : "status"}
      className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
        tone === "err"
          ? "border-err/30 bg-err/10 text-silver-100"
          : "border-ok/30 bg-ok/10 text-silver-100"
      }`}
    >
      {children}
    </p>
  );
}

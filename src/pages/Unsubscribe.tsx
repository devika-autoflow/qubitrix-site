import { useSearchParams, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import QubitrixLogo from "../components/ui/QubitrixLogo";

/**
 * Confirmation page shown after a lead unsubscribes from outreach emails.
 * The n8n /unsub webhook does the actual unsubscribe (marks the sheet row),
 * then redirects here with ?email= so this page can just confirm it.
 * Standalone — deliberately no Nav/Footer/DockNav/Ask Qubi (see App.tsx GlobalChrome),
 * this is a transactional confirmation, not a page to browse from.
 */
export default function Unsubscribe() {
  const [params] = useSearchParams();
  const email = params.get("email");

  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-obsidian-0 px-5 py-16 text-center"
    >
        <QubitrixLogo markSize={40} withWordmark={false} className="mb-8" />

        <div
          className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--color-volt) 16%, transparent)" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M5 13l4.5 4.5L19 8"
              fill="none"
              stroke="var(--color-volt-tint)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="hud-label">STATUS</p>
        <h1 className="metal-text font-display mt-3 text-3xl font-semibold sm:text-4xl">
          You're unsubscribed
        </h1>

        {email && (
          <p className="mt-4 rounded-lg border hairline bg-obsidian-2/60 px-4 py-1.5 font-mono text-xs text-silver-400">
            {email}
          </p>
        )}

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver-400">
          You won't receive any more emails from Qubitrix AI.
        </p>

        <div className="glow-card mt-10 w-full max-w-sm px-6 py-5 text-left">
          <p className="hud-label">Unsubscribed by mistake?</p>
          <p className="mt-2 text-sm leading-relaxed text-silver-100">
            Email{" "}
            <a
              href="mailto:info@qubitrixai.com"
              className="text-volt-tint hover:text-plasma-tint"
            >
              info@qubitrixai.com
            </a>{" "}
            and we'll add you back.
          </p>
        </div>

        <Button as="a" href="/" variant="primary" className="mt-8">
          Back to qubitrixai.com
        </Button>

        <p className="mt-6 font-mono text-[11px] tracking-[0.1em] text-silver-600">
          <Link to="/" className="hover:text-silver-400">
            QUBITRIX AI
          </Link>{" "}
          &middot;{" "}
          <a href="mailto:info@qubitrixai.com" className="hover:text-silver-400">
            info@qubitrixai.com
          </a>
        </p>
    </main>
  );
}

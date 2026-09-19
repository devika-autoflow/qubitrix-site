import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, onConsentChange } from "../../lib/consent";

/**
 * Consent banner. Accept and Reject are given equal visual weight on purpose —
 * a reject path hidden behind an extra click is the single most-fined pattern
 * under GDPR. The banner only appears when no current-version decision exists.
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Deferred one tick so the banner never competes with the hero's first paint.
    const t = setTimeout(() => setVisible(getConsent() === null), 600);
    const off = onConsentChange((record) => setVisible(record === null));
    return () => {
      clearTimeout(t);
      off();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border hairline bg-obsidian-0/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        <p id="consent-title" className="hud-label mb-2">
          Cookies &amp; local storage
        </p>
        <p className="text-sm leading-relaxed text-silver-400">
          We use storage that is strictly necessary to run this site and keep you
          signed in. With your permission we also keep a persistent id that lets us
          recognise a returning visitor across conversations. You can change this
          at any time from the footer.{" "}
          <Link className="text-silver-100 underline underline-offset-4" to="/legal/cookies">
            Cookie Policy
          </Link>
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="flex-1 rounded-full border hairline bg-silver-100 px-5 py-2.5 text-sm font-medium text-obsidian-0 transition hover:opacity-90"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setConsent("rejected")}
            className="flex-1 rounded-full border hairline px-5 py-2.5 text-sm font-medium text-silver-100 transition hover:bg-white/5"
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </div>
  );
}

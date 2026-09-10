import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import {
  impactIntro,
  impactRows,
  impactTotal,
  impactColumns,
  impactBanner,
  impactFootnote,
  impactCta,
} from "../../content/impact";
import { site } from "../../content/site";
import { useReveal } from "../../lib/useReveal";
import { prefersReducedMotion } from "../../lib/caps";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const pct = (savings: number, human: number) => Math.round((savings / human) * 100);

/** Counts from 0 to `value` once the table scrolls into view. */
function CountUp({ value, play }: { value: number; play: boolean }) {
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    if (!play || prefersReducedMotion()) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);

  return <>{usd(play || prefersReducedMotion() ? display : 0)}</>;
}

/** Bold pill showing the % given back — the only number this section shouts. */
function SavingsBadge({ percent, big = false }: { percent: number; big?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-volt/40 bg-volt/10 font-mono font-bold text-volt-tint ${
        big ? "px-4 py-1.5 text-base sm:text-lg" : "px-3 py-1 text-xs sm:text-sm"
      }`}
    >
      {percent}% BACK
    </span>
  );
}

/** Scene 04 — the savings ledger. A financial report, not a brochure. */
export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { once: true, margin: "-15% 0px" });
  useReveal(ref);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[16vh] sm:px-8"
    >
      <SectionHeading
        index="03"
        kicker={impactIntro.kicker}
        heading={impactIntro.heading}
        sub={impactIntro.sub}
      />

      <div data-reveal ref={tableRef} className="os-panel mt-12 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b hairline">
                <th className="px-4 py-4 font-mono text-[11px] font-medium tracking-[0.14em] text-silver-600 sm:px-6">
                  {impactColumns.role.toUpperCase()}
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-medium tracking-[0.14em] text-silver-600 sm:px-6">
                  {impactColumns.human.toUpperCase()}
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-medium tracking-[0.14em] text-volt-tint sm:px-6">
                  {impactColumns.savings.toUpperCase()}
                </th>
              </tr>
            </thead>
            <tbody>
              {impactRows.map((r) => (
                <tr
                  key={r.role}
                  className="border-b border-white/6 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-4 text-sm text-silver-100 sm:px-6">{r.role}</td>
                  <td className="px-4 py-4 text-right sm:px-6">
                    <span className="font-mono text-sm tabular-nums text-err/80 line-through decoration-err/50">
                      {usd(r.human)}
                    </span>
                    <span className="ml-1.5 font-mono text-[10px] tracking-wide text-silver-600">/yr</span>
                  </td>
                  <td className="px-4 py-4 text-right sm:px-6">
                    <div className="flex items-center justify-end gap-3">
                      <span className="font-mono text-sm tabular-nums text-ok">
                        <CountUp value={r.savings} play={inView} /> saved
                      </span>
                      <SavingsBadge percent={pct(r.savings, r.human)} />
                    </div>
                  </td>
                </tr>
              ))}
              {/* Grand total — the summary row */}
              <tr className="border-t-2 border-white/20 bg-white/[0.04]">
                <td className="px-4 py-5 text-sm font-semibold text-silver-100 sm:px-6">
                  {impactTotal.role.toUpperCase()}
                </td>
                <td className="px-4 py-5 text-right sm:px-6">
                  <span className="font-mono text-base font-semibold tabular-nums text-err/80 line-through decoration-err/50 sm:text-lg">
                    {usd(impactTotal.human)}
                  </span>
                </td>
                <td className="px-4 py-5 text-right sm:px-6">
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-mono text-lg font-bold tabular-nums text-ok sm:text-xl">
                      <CountUp value={impactTotal.savings} play={inView} /> SAVED
                    </span>
                    <SavingsBadge percent={pct(impactTotal.savings, impactTotal.human)} big />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* The decision banner */}
        <div className="border-t hairline bg-gradient-to-r from-volt/[0.08] via-transparent to-plasma/[0.07] px-4 py-6 sm:px-6">
          <p className="max-w-3xl text-sm leading-relaxed text-silver-100 sm:text-base">
            {impactBanner}
          </p>
        </div>
      </div>

      <p data-reveal className="mt-5 max-w-2xl text-xs leading-relaxed text-silver-600">
        {impactFootnote}
      </p>

      {/* Pricing CTA — the table never quotes Qubitrix; the call does */}
      <div
        data-reveal
        className="btn-aurora-border mt-10 flex flex-col items-start gap-6 rounded-3xl bg-obsidian-2/60 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
      >
        <div>
          <p className="hud-label text-volt-tint">{impactCta.kicker}</p>
          <h3 className="metal-text font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {impactCta.heading}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-silver-400 sm:text-base">
            {impactCta.text}
          </p>
        </div>
        {site.calendlyUrl ? (
          <Button as="a" variant="primary" href={site.calendlyUrl} target="_blank" rel="noreferrer" className="shrink-0 !px-8">
            {impactCta.button}
          </Button>
        ) : (
          <Button as="a" variant="primary" href="/book" className="shrink-0 !px-8">
            {impactCta.button}
          </Button>
        )}
      </div>
    </section>
  );
}

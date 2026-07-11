import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import {
  impactIntro,
  impactRows,
  impactTotal,
  impactColumns,
  impactBanner,
  impactFootnote,
} from "../../content/impact";
import { useReveal } from "../../lib/useReveal";
import { prefersReducedMotion } from "../../lib/caps";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

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

/** Scene 04 — the savings ledger. A financial report, not a brochure. */
export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tableRef, { once: true, margin: "-15% 0px" });
  useReveal(ref);

  const numCell = "px-4 py-4 text-right font-mono text-sm tabular-nums sm:px-6";

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
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b hairline">
                <th className="px-4 py-4 font-mono text-[11px] font-medium tracking-[0.14em] text-silver-600 sm:px-6">
                  {impactColumns.role.toUpperCase()}
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-medium tracking-[0.14em] text-silver-600 sm:px-6">
                  {impactColumns.human.toUpperCase()}
                </th>
                <th className="px-4 py-4 text-right font-mono text-[11px] font-medium tracking-[0.14em] text-silver-600 sm:px-6">
                  {impactColumns.ai.toUpperCase()}
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
                  <td className={`${numCell} text-silver-400`}>{usd(r.human)}</td>
                  <td className={`${numCell} text-silver-100`}>{usd(r.ai)}</td>
                  <td className={`${numCell} text-ok`}>
                    <CountUp value={r.savings} play={inView} /> saved
                  </td>
                </tr>
              ))}
              {/* Grand total — the summary row */}
              <tr className="border-t-2 border-white/20 bg-white/[0.04]">
                <td className="px-4 py-5 text-sm font-semibold text-silver-100 sm:px-6">
                  {impactTotal.role.toUpperCase()}
                </td>
                <td className={`${numCell} font-semibold text-err/80`}>{usd(impactTotal.human)}</td>
                <td className={`${numCell} font-semibold text-silver-100`}>{usd(impactTotal.ai)}</td>
                <td className="px-4 py-5 text-right font-mono text-lg font-bold tabular-nums text-ok sm:px-6 sm:text-xl">
                  <CountUp value={impactTotal.savings} play={inView} /> SAVED
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
    </section>
  );
}

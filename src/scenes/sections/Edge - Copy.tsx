import { useRef } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import { edgeIntro, edgeBlocks, edgeCta } from "../../content/edge";
import { useReveal } from "../../lib/useReveal";

/**
 * Section 04 — the quantum edge, kept deliberately compact (user decision):
 * a credibility mention, not a centerpiece. Two cards + a research link.
 */
export default function Edge() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="edge"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[9vh] sm:px-8"
    >
      <SectionHeading
        index="04"
        kicker={edgeIntro.kicker}
        heading={edgeIntro.heading}
        sub={edgeIntro.sub}
      />

      {/* The comparison — sharp contrast, gray vs glow */}
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {edgeBlocks.map((b, i) => (
          <div
            key={b.id}
            data-reveal
            className={`os-panel flex h-full flex-col rounded-3xl p-7 transition-colors sm:p-8 ${
              i === 1
                ? "border border-volt/25 shadow-[0_0_60px_rgba(124,107,255,0.10)] hover:border-volt/45"
                : "border border-white/8 hover:border-white/15"
            }`}
          >
            <p className={`hud-label ${i === 1 ? "text-volt-tint" : "text-silver-600"}`}>
              {b.label}
            </p>
            <h3
              className={`font-display mt-5 text-2xl font-semibold ${
                i === 1 ? "metal-text" : "text-silver-400"
              }`}
            >
              {b.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-silver-400">{b.text}</p>
          </div>
        ))}
      </div>

      {/* Slim research pointer — noticeable, never the centerpiece */}
      <div data-reveal className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t hairline pt-5">
        <p className="text-sm leading-relaxed text-silver-400">{edgeCta.text}</p>
        <Link
          to={edgeCta.href}
          className="font-mono text-[12px] tracking-[0.14em] text-volt-tint transition-colors hover:text-silver-100"
        >
          {edgeCta.button.toUpperCase()}
        </Link>
      </div>
    </section>
  );
}

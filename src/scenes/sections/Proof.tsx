import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import { work, workIntro } from "../../content/work";
import { testimonials } from "../../content/testimonials";
import { useReveal } from "../../lib/useReveal";

/**
 * Section 06 — Proof. Case studies (real builds with images, opening their
 * detail pages) followed by testimonials.
 */
export default function Proof() {
  const ref = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  useReveal(ref);

  const activeItem = work[activeIdx];

  return (
    <section
      id="proof"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[16vh] sm:px-8"
    >
      <SectionHeading
        index="06"
        kicker={workIntro.kicker}
        heading={workIntro.heading}
        sub={workIntro.sub}
      />

      {/* Case studies — each row opens its full detail page */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ol className="divide-y divide-white/6 border-y hairline">
          {work.map((w, i) => (
            <li key={w.slug} data-reveal>
              <Link
                to={`/work/${w.slug}`}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 px-2 py-6 transition-colors sm:gap-8 sm:px-4 ${
                  activeIdx === i ? "bg-white/[0.025]" : ""
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-silver-600">
                  {w.index}
                </span>
                <span>
                  <span className="metal-text font-display block text-lg font-semibold sm:text-xl">
                    {w.title}
                  </span>
                  <span className="mt-1 block text-sm text-silver-400">{w.outcome}</span>
                </span>
                <span className="flex items-center gap-4">
                  <span className="hidden rounded-md border border-white/8 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-silver-600 sm:inline">
                    {w.kind}
                  </span>
                  <span className="text-silver-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-volt-tint">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* live preview panel — desktop */}
        <aside className="hidden lg:block" aria-hidden="true">
          <div className="os-panel sticky top-28 p-6">
            <p className="hud-label mb-3">{activeItem.index} — PREVIEW</p>
            <p className="text-sm leading-relaxed text-silver-400">{activeItem.problem}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeItem.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/8 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-silver-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div data-reveal className="mt-10">
        <Link
          to="/work"
          className="font-mono text-[11px] tracking-[0.14em] text-volt-tint transition-colors hover:text-silver-100"
        >
          VIEW ALL CASE STUDIES →
        </Link>
      </div>

      {/* Testimonials — the human element */}
      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            data-reveal
            className="os-panel flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_44px_rgba(124,107,255,0.18)]"
          >
            <span className="hud-label text-volt-tint">SIGNAL 0{i + 1}</span>
            <blockquote className="mt-5 flex-1">
              <p className="font-display text-lg font-medium leading-relaxed text-silver-100">
                “{t.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-6 border-t hairline pt-4">
              <p className="text-sm font-medium text-silver-100">{t.name}</p>
              <p className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-silver-600">
                {t.role.toUpperCase()}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

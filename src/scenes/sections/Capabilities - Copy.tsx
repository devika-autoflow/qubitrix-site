import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import GlowCard from "../../components/ui/GlowCard";
import { services, capabilitiesIntro } from "../../content/services";
import { useReveal } from "../../lib/useReveal";

/**
 * Section 02 — What We Provide. Uniform, symmetric cards; each opens its
 * own service detail page at /services/:slug.
 */
export default function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useReveal(ref);

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[16vh] sm:px-8"
    >
      <SectionHeading
        index="02"
        kicker={capabilitiesIntro.kicker}
        heading={capabilitiesIntro.heading}
        sub={capabilitiesIntro.sub}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <div key={s.slug} data-reveal className="h-full">
            <GlowCard
              className="flex h-full min-h-[280px] flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_48px_rgba(124,107,255,0.22)] sm:p-8"
              onClick={() => navigate(`/services/${s.slug}`)}
              ariaLabel={`Open ${s.title} details`}
            >
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/8 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-silver-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="metal-text font-display mt-6 text-2xl font-semibold sm:text-[1.65rem]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-400">{s.value}</p>
              <p className="mt-auto pt-8 font-mono text-[11px] tracking-[0.14em] text-volt-tint">
                VIEW DETAILS →
              </p>
            </GlowCard>
          </div>
        ))}
      </div>
    </section>
  );
}

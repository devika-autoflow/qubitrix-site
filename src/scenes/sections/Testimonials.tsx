import { useRef } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import { testimonials } from "../../content/testimonials";
import { useReveal } from "../../lib/useReveal";

/** Scene 07 — signals from the field. Three voices, no metrics claimed. */
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative z-10 mx-auto max-w-[86rem] px-5 py-[14vh] sm:px-8 lg:px-10"
    >
      <SectionHeading
        index="07"
        kicker="Signals"
        heading="What operators say."
        sub="Words from the people whose systems now run themselves."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={t.name} data-reveal className="os-panel flex h-full flex-col p-7">
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

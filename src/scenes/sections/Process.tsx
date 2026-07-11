import { useEffect, useRef } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import { processIntro, processSteps } from "../../content/process";
import { useReveal } from "../../lib/useReveal";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/caps";

/** Scene 06 — natural scroll. Circuit line draws as it passes. */
export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useReveal(ref);

  useEffect(() => {
    if (!lineRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[16vh] sm:px-8"
    >
      <SectionHeading
        index="05"
        kicker={processIntro.kicker}
        heading={processIntro.heading}
        sub={processIntro.sub}
      />

      <div className="relative mt-14 pl-8 sm:pl-12">
        {/* the drawing circuit line */}
        <div
          ref={lineRef}
          className="absolute left-[7px] top-1 h-full w-px bg-gradient-to-b from-volt via-plasma/60 to-transparent sm:left-[11px]"
          aria-hidden="true"
        />
        <ol className="space-y-12">
          {processSteps.map((step) => (
            <li key={step.index} data-reveal className="relative">
              <span
                className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-left-12"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full border border-volt bg-obsidian-0" />
              </span>
              <p className="hud-label">{step.index}</p>
              <h3 className="metal-text font-display mt-1.5 text-xl font-semibold sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] tracking-[0.14em] text-volt-tint">
                {step.meta}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-silver-400">
                {step.line}
              </p>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}

import { useEffect, useRef } from "react";
import Button from "../../components/ui/Button";
import { site } from "../../content/site";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/caps";
import { scrollToTarget } from "../../lib/lenis";

/** Scene 01 — pinned. Copy holds the left; the Q formation owns the right. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // entrance
      gsap.fromTo(
        "[data-hero-stagger]",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.09, delay: 0.55, ease: "power3.out" }
      );

      // pin: content dissolves upward as the Q releases into the stream
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=85%",
          pin: contentRef.current,
          scrub: true,
        },
      })
        .to(contentRef.current, { opacity: 0, y: -70, ease: "none" }, 0.25);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 flex min-h-screen items-center"
      aria-label={`Qubitrix — ${site.tagline}`}
    >
      <div
        ref={contentRef}
        className="mx-auto grid w-full max-w-[86rem] items-center gap-8 px-5 pt-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:px-10"
      >
        {/* Left — the thesis */}
        <div>
          <p data-hero-stagger className="hud-label">
            <span className="text-volt-tint">01</span>
            <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-white/15" aria-hidden="true" />
            {site.heroKicker}
          </p>

          <h1
            data-hero-stagger
            className="metal-text font-display mt-6 max-w-4xl text-[clamp(2.1rem,4.7vw,4.2rem)] font-semibold leading-[1.02] tracking-tight"
          >
            <span className="whitespace-nowrap">{site.heroHeadline[0]}</span>
            <br />
            <span className="whitespace-nowrap">
              {site.heroHeadline[1]}
              <span className="qubit-dot ml-[0.12em]" aria-hidden="true" />
            </span>
          </h1>

          <p
            data-hero-stagger
            className="mt-7 max-w-md text-base leading-relaxed text-silver-400 sm:text-lg"
          >
            {site.subline}
          </p>

          <div data-hero-stagger className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="primary" onClick={() => scrollToTarget("#contact")}>
              {site.heroCtaPrimary}
            </Button>
            <Button variant="ghost" onClick={() => scrollToTarget("#impact")}>
              {site.heroCtaSecondary}
            </Button>
          </div>
        </div>

        {/* Right — reserved airspace: the particle Q composes here, unobstructed */}
        <div className="hidden min-h-[520px] lg:block" aria-hidden="true" />
      </div>

      <div
        data-hero-stagger
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <p className="hud-label flex flex-col items-center gap-3">
          SCROLL
          <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        </p>
      </div>
    </section>
  );
}

// keep ScrollTrigger import referenced (registered via lib/gsap)
void ScrollTrigger;

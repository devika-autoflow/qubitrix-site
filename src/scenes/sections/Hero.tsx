import { useEffect, useRef } from "react";
import Button from "../../components/ui/Button";
import { site } from "../../content/site";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/caps";
import { scrollToTarget } from "../../lib/lenis";

/** Scene 01 — pinned. The metallic Q holds while the headline breathes (plan §10). */
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
      aria-label="Qubitrix — intelligence, engineered"
    >
      <div ref={contentRef} className="mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8">
        <p data-hero-stagger className="hud-label">
          <span className="text-volt-tint">01</span>
          <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-white/15" aria-hidden="true" />
          AI ENGINEERING STUDIO
        </p>

        <h1
          data-hero-stagger
          className="metal-text font-display mt-6 max-w-4xl text-[clamp(2.9rem,8.4vw,6.4rem)] font-semibold leading-[0.98] tracking-tight"
        >
          Intelligence,
          <br />
          engineered
          <span className="qubit-dot ml-[0.12em]" aria-hidden="true" />
        </h1>

        <p
          data-hero-stagger
          className="mt-7 max-w-md text-base leading-relaxed text-silver-400 sm:text-lg"
        >
          {site.subline}
        </p>

        <div data-hero-stagger className="mt-10 flex flex-wrap items-center gap-4">
          <Button variant="primary" onClick={() => scrollToTarget("#contact")}>
            Book a consultation
          </Button>
          <Button variant="ghost" onClick={() => scrollToTarget("#capabilities")}>
            Explore the system
          </Button>
        </div>
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

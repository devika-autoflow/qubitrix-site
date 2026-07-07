import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./caps";

/**
 * Reveal-on-enter for everything marked [data-reveal] inside `root`.
 * Natural scroll sections use this — no pinning (user decision).
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [root]);
}

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./caps";

let lenis: Lenis | null = null;

/** Create the smooth-scroll instance and keep ScrollTrigger in sync. */
export function initLenis(): Lenis | null {
  if (prefersReducedMotion()) return null; // native scroll is the accessible path
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView();
    } else {
      window.scrollTo(0, target);
    }
  }
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

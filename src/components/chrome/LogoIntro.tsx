import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/caps";

/**
 * 0.4s logo glint → fade → hero. No boot theater, no scroll lock
 * (user decision replacing the boot sequence).
 */
export default function LogoIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (done || !ref.current) return;
    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.fromTo(
      ref.current.querySelector("img"),
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" }
    )
      .to(ref.current.querySelector("img"), {
        opacity: 1,
        duration: 0.18,
      })
      .to(ref.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
    return () => {
      tl.kill();
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-obsidian-0"
    >
      <img src="/brand/q-mark.svg" alt="" width={72} height={72} />
    </div>
  );
}

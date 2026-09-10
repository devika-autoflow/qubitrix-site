import { useEffect, useState } from "react";
import { sections } from "../../content/site";
import { scrollToTarget } from "../../lib/lenis";

/** Left HUD rail — mono indices 01–07, the "OS chrome" (plan §11). Desktop only. */
export default function ProgressRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollToTarget(`#${s.id}`)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`font-mono text-[10px] tracking-[0.14em] transition-colors ${
                isActive ? "text-volt-tint" : "text-silver-600 group-hover:text-silver-400"
              }`}
            >
              {s.index}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                isActive ? "w-7 bg-volt" : "w-3 bg-white/15 group-hover:bg-white/30"
              }`}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </nav>
  );
}

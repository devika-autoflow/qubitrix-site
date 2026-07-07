import { useRef } from "react";
import { shiftLines } from "../../content/process";
import { useReveal } from "../../lib/useReveal";

/** Scene 02 — natural scroll. Three states of a business (plan §10). */
export default function Shift() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="shift"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 py-[22vh] sm:px-8"
      aria-label="The shift from manual to autonomous"
    >
      <div className="space-y-[16vh]">
        {shiftLines.map((line, i) => (
          <div key={line.mono} data-reveal className="max-w-3xl">
            <p className="hud-label mb-3">{line.mono}</p>
            <p
              className={`font-display text-[clamp(1.7rem,4.2vw,3.1rem)] font-medium leading-tight tracking-tight ${
                i === 0
                  ? "text-silver-600"
                  : i === 1
                    ? "text-silver-400"
                    : "aurora-text"
              }`}
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

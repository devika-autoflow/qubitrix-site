import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import { faqIntro, faqItems } from "../../content/faq";
import { useReveal } from "../../lib/useReveal";

/** Scene 10 — the last objections, answered. Clean accordion. */
export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion() ?? false;
  useReveal(ref);

  return (
    <section
      id="faq"
      ref={ref}
      className="relative z-10 mx-auto max-w-4xl px-5 py-[14vh] sm:px-8"
    >
      <SectionHeading
        index="07"
        kicker={faqIntro.kicker}
        heading={faqIntro.heading}
        sub={faqIntro.sub}
      />

      <div className="mt-12 divide-y divide-white/6 border-y hairline" data-reveal>
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-silver-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-base font-semibold transition-colors sm:text-lg ${
                      isOpen ? "text-silver-100" : "text-silver-400 group-hover:text-silver-100"
                    }`}
                  >
                    {item.q}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 font-mono text-lg text-volt-tint transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 pl-9 pr-4 text-sm leading-relaxed text-silver-400">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked ambient glow behind the journey — one fixed element,
 * framer-motion drives opacity/transform only (cheap, no repaint storms).
 * Deepens subtly as the visitor descends toward the aurora finale.
 */
export default function ScrollAura() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.35, 0.55, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-8%"]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-[-30vh] z-0 h-[70vh]"
      style={{
        opacity,
        y,
        background:
          "radial-gradient(55% 60% at 50% 100%, rgb(124 107 255 / 0.14), transparent 70%), radial-gradient(40% 45% at 62% 100%, rgb(62 224 240 / 0.08), transparent 65%)",
      }}
    />
  );
}

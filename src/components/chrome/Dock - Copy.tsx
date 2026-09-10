import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Dock — ported from the React Bits component in `qubitrix dump.txt`
 * (macOS-style magnifying dock) and restyled to the Obsidian Instrument
 * language: glass panel, hairline borders, volt glow on the active item.
 */

export interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  baseItemSize?: number;
}

function DockItem({
  item,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: {
  item: DockItemData;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0 };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={item.onClick}
      aria-label={item.label}
      aria-current={item.active ? "true" : undefined}
      className={`relative flex items-center justify-center rounded-xl border transition-colors ${
        item.active
          ? "border-volt/50 bg-volt/12 text-volt-tint shadow-[0_0_18px_rgba(124,107,255,0.35)]"
          : "border-white/10 bg-obsidian-2/80 text-silver-400 hover:text-silver-100 hover:border-white/20"
      }`}
    >
      {item.icon}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 0, x: "-50%" }}
            animate={{ opacity: 1, y: 10, x: "-50%" }}
            exit={{ opacity: 0, y: 0, x: "-50%" }}
            transition={{ duration: 0.18 }}
            role="tooltip"
            className="pointer-events-none absolute -bottom-7 left-1/2 whitespace-pre rounded-md border border-white/10 bg-obsidian-1/95 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-silver-100"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 58,
  distance = 150,
  baseItemSize = 42,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  // reserve the magnified height so the panel never causes layout shift
  useEffect(() => () => mouseX.set(Infinity), [mouseX]);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      role="toolbar"
      aria-label="Section navigation"
      className={`flex items-start gap-2 rounded-2xl border border-white/10 bg-obsidian-1/78 px-2.5 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl ${className}`}
    >
      {items.map((item) => (
        <DockItem
          key={item.label}
          item={item}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
        />
      ))}
    </motion.div>
  );
}

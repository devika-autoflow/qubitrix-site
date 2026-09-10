import { useRef, type ReactNode, type PointerEvent } from "react";
import { isCoarsePointer } from "../../lib/caps";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Spotlight card — rebuilt from the dump component (plan §8):
 * pointer tracking scoped to the card, styles in the stylesheet,
 * hue locked to the brand volt, disabled on touch devices.
 */
export default function GlowCard({ children, className = "", onClick, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = isCoarsePointer();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (coarse || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
    ref.current.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
    ref.current.style.setProperty("--glow-alpha", "1");
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--glow-alpha", "0");
  };

  const interactive = Boolean(onClick);

  return (
    <div
      ref={ref}
      className={`glow-card ${interactive ? "cursor-pointer" : ""} ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { SceneManager } from "./SceneManager";
import {
  prefersReducedMotion,
  supportsWebGL,
  particleBudget,
  isCoarsePointer,
} from "../../lib/caps";
import { gsap } from "../../lib/gsap";

let active: SceneManager | null = null;

/** Sections drive the journey through this accessor. */
export function getScene(): SceneManager | null {
  return active;
}

/**
 * The one persistent canvas behind the Home journey.
 * Reduced-motion / no-WebGL → static poster (plan §14/§15).
 */
export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback] = useState(
    () => prefersReducedMotion() || !supportsWebGL()
  );

  useEffect(() => {
    if (fallback || !canvasRef.current || active) return;

    const manager = new SceneManager(canvasRef.current, particleBudget());
    active = manager;
    manager.start();

    // converge from scatter as the intro fades (plan §10 row 00)
    const intro = { v: 0 };
    const tween = gsap.to(intro, {
      v: 1,
      duration: 1.8,
      delay: 0.15,
      ease: "power2.out",
      onUpdate: () => manager.setIntro(intro.v),
    });

    const onPointer = (e: PointerEvent) => {
      manager.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1
      );
    };
    const fine = !isCoarsePointer();
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      tween.kill();
      if (fine) window.removeEventListener("pointermove", onPointer);
      manager.dispose();
      active = null;
    };
  }, [fallback]);

  if (fallback) {
    return (
      <div
        aria-hidden="true"
        className="canvas-poster fixed inset-0 z-0"
        data-testid="canvas-poster"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

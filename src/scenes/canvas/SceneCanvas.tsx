import { useEffect, useRef, useState } from "react";
import {
  prefersReducedMotion,
  supportsWebGL,
  particleBudget,
  isCoarsePointer,
} from "../../lib/caps";
import { gsap } from "../../lib/gsap";
import { getScene, setScene } from "./sceneRegistry";

export { getScene };

/**
 * The one persistent canvas behind the Home journey.
 * Reduced-motion / no-WebGL → static poster (plan §14/§15).
 *
 * three.js is loaded with a dynamic import so it never blocks first paint, and
 * is never downloaded at all by visitors who get the poster fallback. The
 * import is also deferred to an idle callback so the hero text and fonts win
 * the network race on a cold load.
 */
export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback] = useState(() => prefersReducedMotion() || !supportsWebGL());

  useEffect(() => {
    if (fallback || !canvasRef.current || getScene()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const { SceneManager } = await import("./SceneManager");
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;

      const manager = new SceneManager(canvas, particleBudget());
      setScene(manager);
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

      cleanup = () => {
        tween.kill();
        if (fine) window.removeEventListener("pointermove", onPointer);
        manager.dispose();
        setScene(null);
      };
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void boot(), { timeout: 1200 })
      : window.setTimeout(() => void boot(), 200);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
      cleanup?.();
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

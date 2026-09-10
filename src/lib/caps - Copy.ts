/** Device capability checks — one place, so budgets stay consistent (plan §14). */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isCoarsePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/** Adaptive particle budget (plan §14). */
export function particleBudget(): number {
  if (typeof window === "undefined") return 0;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
  const small = window.innerWidth < 768;
  if (small || mem <= 4) return 6500;
  if (window.innerWidth < 1280 || mem <= 6) return 12000;
  return 18000;
}

export function dprClamp(): number {
  return Math.min(window.devicePixelRatio || 1, 1.75);
}

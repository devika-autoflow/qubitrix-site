import type { SceneManager } from "./SceneManager";

/**
 * Holds the live SceneManager, separately from SceneCanvas, so that sections
 * can reach the scene (`getScene()`) with a *type-only* import of three.js.
 * Without this split, importing getScene would drag the whole 460 kB three
 * bundle back into the eager graph.
 */
let active: SceneManager | null = null;

export function getScene(): SceneManager | null {
  return active;
}

export function setScene(manager: SceneManager | null) {
  active = manager;
}

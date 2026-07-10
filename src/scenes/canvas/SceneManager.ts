import * as THREE from "three";
import {
  qFormation,
  streamFormation,
  blackHoleFormation,
  starFormation,
  auroraFormation,
} from "./formations";
import { dprClamp } from "../../lib/caps";

/**
 * One persistent WebGL canvas for the whole journey (plan §9).
 * A single Points mesh morphs between five precomputed formations;
 * `setProgress(0..4)` — driven by ScrollTrigger — selects the blend.
 * Pacing (user decision, July 2026): each formation lives for TWO sections —
 * it forms, stays fully built through both, then crumples into the next.
 */

const VERT = /* glsl */ `
attribute vec3 aQ;
attribute vec3 aStream;
attribute vec3 aBlackHole;
attribute vec3 aStar;
attribute vec3 aAurora;
attribute vec4 aSeed; // x: rand01, y: size, z: rand01, w: speed

uniform float uProgress;   // 0..4 formation index
uniform float uTime;
uniform float uIntro;      // 0→1 fade-in scatter
uniform float uPixelRatio;
uniform float uQShift;     // hero Q slides right of the headline on desktop
uniform float uQScale;     // hero Q shrinks a touch on desktop for breathing room
uniform float uXShift;     // per-section horizontal drift into blank space
uniform vec2 uPointer;     // smoothed cursor in formation space (fine pointers)
uniform float uHover;      // 0→1 once the cursor is live

varying float vAlpha;
varying vec3 vColor;

const vec3 SILVER = vec3(0.78, 0.78, 0.85);
const vec3 DIM    = vec3(0.40, 0.40, 0.48);
const vec3 VOLT   = vec3(0.486, 0.420, 1.0);
const vec3 PLASMA = vec3(0.243, 0.878, 0.941);

void main() {
  float fi = floor(uProgress);
  float ft = fract(uProgress);
  ft = ft * ft * (3.0 - 2.0 * ft); // smoothstep

  /* ---- animated variants of formations ---- */
  // stream: perpetual x-flow
  vec3 stream = aStream;
  stream.x = mod(stream.x + uTime * (0.6 + aSeed.w * 0.9), 12.0) - 6.0;

  // aurora: traveling wave — big, slow, unmistakable
  vec3 aurora = aAurora;
  aurora.y += sin(aurora.x * 0.9 + uTime * 0.7 + aSeed.x * 6.283) * 0.32
            + sin(aurora.x * 0.35 - uTime * 0.4 + aSeed.z * 6.283) * 0.18;

  // black hole: faint shimmer — the disk glitters without moving
  vec3 blackHole = aBlackHole * (1.0 + sin(uTime * 0.6 + aSeed.z * 6.283) * 0.006);

  // star: living drift — the sky breathes through work and process
  vec3 star = aStar;
  star.x += sin(uTime * 0.11 + aSeed.x * 6.283) * 0.3;
  star.y += cos(uTime * 0.08 + aSeed.z * 6.283) * 0.16;

  // q: breathing shimmer, offset toward the right on wide viewports
  vec3 q = aQ * uQScale * (1.0 + sin(uTime * 0.8 + aSeed.x * 6.283) * 0.004);
  q.x += uQShift;

  /* ---- pick blend pair ---- */
  vec3 A = q;      vec3 B = stream;   vec3 cA = SILVER;               vec3 cB = mix(DIM, PLASMA, aSeed.x * 0.5);
  if (fi > 0.5) { A = stream;  B = blackHole; cA = mix(DIM, PLASMA, aSeed.x * 0.5); cB = mix(SILVER, VOLT, aSeed.x * 0.65); }
  if (fi > 1.5) { A = blackHole; B = star;   cA = mix(SILVER, VOLT, aSeed.x * 0.65); cB = mix(DIM, SILVER, aSeed.z * 0.5); }
  if (fi > 2.5) { A = star;    B = aurora;   cA = mix(DIM, SILVER, aSeed.z * 0.5);  cB = mix(VOLT, PLASMA, clamp(aAurora.x / 9.6 + 0.5, 0.0, 1.0)); }
  if (fi > 3.5) { A = aurora;  B = aurora;   cA = mix(VOLT, PLASMA, clamp(aAurora.x / 9.6 + 0.5, 0.0, 1.0)); cB = cA; }

  vec3 pos = mix(A, B, ft);
  pos.x += uXShift;
  vColor = mix(cA, cB, ft);

  // hover glow: particles near the smoothed cursor warm up and trail the
  // pointer. Kept subtle — it must never outshine the DOM text above it.
  float glow = smoothstep(0.95, 0.0, distance(pos.xy, uPointer)) * uHover;
  vColor = mix(vColor, mix(VOLT, PLASMA, aSeed.x), glow * 0.45);

  // intro: particles converge from a scattered cloud
  vec3 scatter = pos + normalize(vec3(aSeed.x - 0.5, aSeed.z - 0.5, aSeed.w - 0.5) + 0.001) * (3.5 * (1.0 - uIntro));
  pos = mix(scatter, pos, uIntro);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // bolder points — the formations must read as the main event
  float size = aSeed.y * (0.8 + aSeed.x * 1.0) * (1.0 + glow * 0.35);
  gl_PointSize = max(size * uPixelRatio * (9.0 / -mv.z), 1.0);

  // slightly brighter floor — formations must stay readable in blank space
  vAlpha = (0.16 + aSeed.z * 0.22 + glow * (0.06 + aSeed.z * 0.08)) * uIntro;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
varying float vAlpha;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.06, d) * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor, a);
}
`;

export class SceneManager {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private material: THREE.ShaderMaterial;
  private points: THREE.Points;
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private pointerTarget = new THREE.Vector2(0, 0);
  private pointerCurrent = new THREE.Vector2(0, 0);
  private disposed = false;

  constructor(canvas: HTMLCanvasElement, count: number) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(dprClamp());
    this.renderer.setClearColor(0x000000, 0);

    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      40
    );
    this.camera.position.z = 6;

    const geo = new THREE.BufferGeometry();
    const set = (name: string, arr: Float32Array, itemSize = 3) =>
      geo.setAttribute(name, new THREE.BufferAttribute(arr, itemSize));

    // base position attribute (required by three) — reuse Q
    const qArr = qFormation(count);
    set("position", qArr);
    set("aQ", qArr);
    set("aStream", streamFormation(count));
    set("aBlackHole", blackHoleFormation(count));
    set("aStar", starFormation(count));
    set("aAurora", auroraFormation(count));

    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      seeds[i * 4] = Math.random();
      seeds[i * 4 + 1] = 0.9 + Math.random() * 1.7; // size
      seeds[i * 4 + 2] = Math.random();
      seeds[i * 4 + 3] = Math.random(); // speed
    }
    set("aSeed", seeds, 4);

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uPixelRatio: { value: dprClamp() },
        uQShift: { value: 0 },
        uQScale: { value: 1 },
        uXShift: { value: 0 },
        uPointer: { value: new THREE.Vector2(99, 99) },
        uHover: { value: 0 },
      },
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    window.addEventListener("resize", this.onResize);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.onResize();
  }

  private onResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);

    // fit formations (extent ≈ ±2.3) inside the visible frustum at z=6
    const halfH = Math.tan(((this.camera.fov / 2) * Math.PI) / 180) * 6;
    const halfW = halfH * this.camera.aspect;
    const scale = Math.min(1, (Math.min(halfW, halfH) * 0.82) / 2.3);
    this.points.scale.setScalar(scale);
    this.halfW = halfW;
    this.halfH = halfH;
    this.meshScale = scale;

    // on wide screens the hero Q shrinks a touch and composes further right
    // of the headline — clear air between copy and formation, never clipped.
    // On small screens it stays centered behind the copy (overlap intended).
    this.wide = w >= 1024;
    const qScale = this.wide ? 0.86 : 1;
    let qShift = 0;
    if (this.wide) {
      const desired = Math.max(1.7, (halfW / scale) * 0.42);
      const maxShift = halfW / scale - 2.35 * qScale - 0.35;
      qShift = Math.min(desired, maxShift);
    }
    this.material.uniforms.uQScale.value = qScale;
    this.material.uniforms.uQShift.value = qShift;
    this.applyShift();
  };

  private halfW = 4;
  private halfH = 2.8;
  private meshScale = 1;

  /** Formations drift into whichever side of the layout is empty (desktop). */
  private static SHIFT_TARGETS = [0, 0, 1.3, 0, 0]; // Q stream blackhole star aurora
  private wide = window.innerWidth >= 1024;
  private progress = 0;
  private targetProgress = 0;

  private applyShift() {
    if (!this.wide) {
      this.material.uniforms.uXShift.value = 0;
      return;
    }
    const p = this.progress;
    const i = Math.min(3, Math.floor(p));
    const t = p - i;
    const s = t * t * (3 - 2 * t);
    const T = SceneManager.SHIFT_TARGETS;
    this.material.uniforms.uXShift.value = T[i] + (T[i + 1] - T[i]) * s;
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  /**
   * 0..4 continuous formation index, driven by ScrollTrigger.
   * Only sets the target — the render loop glides toward it, so fast
   * scrolling never snaps a formation.
   */
  setProgress(p: number) {
    this.targetProgress = Math.max(0, Math.min(4, p));
  }

  /** Intro convergence 0..1 (LogoIntro drives this once). */
  setIntro(v: number) {
    this.material.uniforms.uIntro.value = v;
  }

  /** Normalized pointer −1..1 for parallax + hover glow (desktop only). */
  setPointer(x: number, y: number) {
    this.pointerTarget.set(x, y);
    this.hoverActive = true;
  }

  private hoverActive = false;

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.clock.start();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      const u = this.material.uniforms;
      u.uTime.value = this.clock.getElapsedTime();

      // glide toward the scroll target — smooth morphs, never sudden
      const diff = this.targetProgress - this.progress;
      if (Math.abs(diff) > 0.0004) {
        // 0.09: quick enough that a fast scroll still lands each formation
        // fully (the plateau between morphs is where shapes must read clearly)
        this.progress += diff * 0.09;
        u.uProgress.value = this.progress;
        this.applyShift();
      }

      // gentle pointer parallax
      this.pointerCurrent.lerp(this.pointerTarget, 0.045);
      this.camera.position.x = this.pointerCurrent.x * 0.28;
      this.camera.position.y = -this.pointerCurrent.y * 0.18;
      this.camera.lookAt(0, 0, 0);

      // hover glow follows the same eased pointer, mapped into the
      // formation's pre-scale space so the shader can compare directly
      if (this.hoverActive) {
        u.uPointer.value.set(
          (this.pointerCurrent.x * this.halfW) / this.meshScale,
          (-this.pointerCurrent.y * this.halfH) / this.meshScale
        );
        u.uHover.value = Math.min(1, u.uHover.value + 0.04);
      }

      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose() {
    this.disposed = true;
    this.stop();
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.points.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}

import * as THREE from "three";
import { qFormation, floatFormation } from "./formations";
import { dprClamp } from "../../lib/caps";

/**
 * One persistent WebGL canvas for the whole journey (user decision — replaces
 * the earlier multi-shape morph). The Q assembles once in the Hero, then
 * dissolves into an ambient floating particle field that stays that way,
 * unchanged in shape, all the way to Contact. `setProgress` still receives a
 * continuous section index from ScrollTrigger, but past the initial 0→1
 * dissolve it drives ONLY a slow color-tint drift (TINT chain below) — never
 * another shape change.
 */

const VERT = /* glsl */ `
attribute vec3 aQ;
attribute vec3 aFloat;
attribute vec4 aSeed; // x: rand01, y: size, z: rand01, w: speed

uniform float uProgress;   // continuous section index — color tint only, past 1.0
uniform float uTime;
uniform float uIntro;      // 0→1 fade-in scatter
uniform float uPixelRatio;
uniform float uQShift;     // hero Q slides right of the headline on desktop
uniform float uQScale;     // hero Q shrinks a touch on desktop for breathing room
uniform vec2 uPointer;     // smoothed cursor in formation space (fine pointers)
uniform float uHover;      // 0→1 once the cursor is live

varying float vAlpha;
varying vec3 vColor;

const vec3 SILVER = vec3(0.78, 0.78, 0.85);
const vec3 DIM    = vec3(0.40, 0.40, 0.48);
const vec3 VOLT   = vec3(0.486, 0.420, 1.0);
const vec3 PLASMA = vec3(0.243, 0.878, 0.941);

void main() {
  // morph: 0 (Q, hero) → 1 (dissolved into the floating field). Fires once,
  // over the hero→capabilities transition, then stays fully dissolved.
  float morph = smoothstep(0.0, 1.0, clamp(uProgress, 0.0, 1.0));

  // q: breathing shimmer, offset toward the right on wide viewports
  vec3 q = aQ * uQScale * (1.0 + sin(uTime * 0.8 + aSeed.x * 6.283) * 0.004);
  q.x += uQShift;

  // float: slow independent bob per particle — dust motes, not a current
  vec3 flt = aFloat;
  flt.x += sin(uTime * (0.05 + aSeed.w * 0.05) + aSeed.x * 6.283) * 0.4;
  flt.y += cos(uTime * (0.045 + aSeed.z * 0.045) + aSeed.z * 6.283) * 0.28;
  flt.z += sin(uTime * 0.04 + aSeed.x * 6.283) * 0.18;

  vec3 pos = mix(q, flt, morph);

  // tint: a slow color drift across sections, never a shape change.
  // Each particle keeps its own subtle brightness (aSeed.z) under the tint.
  float ti = floor(clamp(uProgress, 0.0, 7.0));
  float tf = fract(uProgress);
  tf = tf * tf * (3.0 - 2.0 * tf);

  vec3 base = mix(DIM, SILVER, aSeed.z);
  vec3 tA = SILVER;                              // 0 hero — calm silver
  vec3 tB = mix(SILVER, PLASMA, 0.14);            // 1 capabilities — cool tech tinge
  if (ti > 0.5) { tA = mix(SILVER, PLASMA, 0.14); tB = mix(SILVER, VOLT, 0.14); }      // 2 impact
  if (ti > 1.5) { tA = mix(SILVER, VOLT, 0.14);   tB = mix(SILVER, PLASMA, 0.24); }    // 3 edge — quantum
  if (ti > 2.5) { tA = mix(SILVER, PLASMA, 0.24); tB = SILVER * 0.97; }                // 4 process — neutral
  if (ti > 3.5) { tA = SILVER * 0.97;             tB = mix(SILVER, VOLT, 0.2); }       // 5 proof — confidence
  if (ti > 4.5) { tA = mix(SILVER, VOLT, 0.2);    tB = SILVER; }                       // 6 faq — settles back
  if (ti > 5.5) { tA = SILVER;                    tB = mix(SILVER, mix(VOLT, PLASMA, 0.5), 0.26); } // 7 contact — echoes the aurora CTA

  vec3 tint = mix(tA, tB, tf);
  vColor = mix(base, tint, 0.55);

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
    set("aFloat", floatFormation(count));

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
  };

  private halfW = 4;
  private halfH = 2.8;
  private meshScale = 1;

  private wide = window.innerWidth >= 1024;
  private progress = 0;
  private targetProgress = 0;

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  /**
   * Continuous section index driven by ScrollTrigger (0=hero, 1=capabilities,
   * … 7=contact). Only sets the target — the render loop glides toward it, so
   * fast scrolling never snaps. Past 1.0 this only steers the color tint;
   * the Q→float dissolve is fully resolved by the time it reaches 1.
   */
  setProgress(p: number) {
    this.targetProgress = Math.max(0, p);
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

      // glide toward the scroll target — smooth dissolve/tint, never sudden
      const diff = this.targetProgress - this.progress;
      if (Math.abs(diff) > 0.0004) {
        this.progress += diff * 0.09;
        u.uProgress.value = this.progress;
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

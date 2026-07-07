import * as THREE from "three";
import {
  qFormation,
  streamFormation,
  latticeFormation,
  orbitalFormation,
  starFormation,
  auroraFormation,
} from "./formations";
import { dprClamp } from "../../lib/caps";

/**
 * One persistent WebGL canvas for the whole journey (plan §9).
 * A single Points mesh morphs between six precomputed formations;
 * `setProgress(0..5)` — driven by ScrollTrigger — selects the blend.
 */

const VERT = /* glsl */ `
attribute vec3 aQ;
attribute vec3 aStream;
attribute vec3 aLattice;
attribute vec3 aOrbital;
attribute vec3 aStar;
attribute vec3 aAurora;
attribute vec4 aSeed; // x: rand01, y: size, z: rand01, w: speed

uniform float uProgress;   // 0..5 formation index
uniform float uTime;
uniform float uIntro;      // 0→1 fade-in scatter
uniform float uPixelRatio;
uniform float uQShift;     // hero Q slides right of the headline on desktop

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

  // orbital: rings rotate at seed-dependent speed
  float ang = uTime * (0.05 + aSeed.w * 0.11);
  float ca = cos(ang), sa = sin(ang);
  vec3 orbital = vec3(
    aOrbital.x * ca - aOrbital.z * sa,
    aOrbital.y,
    aOrbital.x * sa + aOrbital.z * ca
  );

  // aurora: traveling wave
  vec3 aurora = aAurora;
  aurora.y += sin(aurora.x * 0.9 + uTime * 0.7 + aSeed.x * 6.283) * 0.14;

  // star: slow drift
  vec3 star = aStar;
  star.x += sin(uTime * 0.05 + aSeed.x * 6.283) * 0.12;

  // q: breathing shimmer, offset toward the right on wide viewports
  vec3 q = aQ * (1.0 + sin(uTime * 0.8 + aSeed.x * 6.283) * 0.004);
  q.x += uQShift;

  /* ---- pick blend pair ---- */
  vec3 A = q;      vec3 B = stream;   vec3 cA = SILVER;               vec3 cB = mix(DIM, PLASMA, aSeed.x * 0.5);
  if (fi > 0.5) { A = stream;  B = aLattice; cA = mix(DIM, PLASMA, aSeed.x * 0.5); cB = mix(SILVER, VOLT, aSeed.x * 0.65); }
  if (fi > 1.5) { A = aLattice; B = orbital; cA = mix(SILVER, VOLT, aSeed.x * 0.65); cB = mix(VOLT, PLASMA, aSeed.z); }
  if (fi > 2.5) { A = orbital; B = star;     cA = mix(VOLT, PLASMA, aSeed.z);        cB = DIM; }
  if (fi > 3.5) { A = star;    B = aurora;   cA = DIM;  cB = mix(VOLT, PLASMA, clamp(aAurora.x / 9.6 + 0.5, 0.0, 1.0)); }
  if (fi > 4.5) { A = aurora;  B = aurora;   cA = mix(VOLT, PLASMA, clamp(aAurora.x / 9.6 + 0.5, 0.0, 1.0)); cB = cA; }

  vec3 pos = mix(A, B, ft);
  vColor = mix(cA, cB, ft);

  // intro: particles converge from a scattered cloud
  vec3 scatter = pos + normalize(vec3(aSeed.x - 0.5, aSeed.z - 0.5, aSeed.w - 0.5) + 0.001) * (3.5 * (1.0 - uIntro));
  pos = mix(scatter, pos, uIntro);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // small, dim points — additive blending across ~18k particles needs restraint
  float size = aSeed.y * (0.7 + aSeed.x * 0.9);
  gl_PointSize = max(size * uPixelRatio * (7.5 / -mv.z), 1.0);

  vAlpha = (0.06 + aSeed.z * 0.12) * uIntro;
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
    set("aLattice", latticeFormation(count));
    set("aOrbital", orbitalFormation(count));
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

    // on wide screens the hero Q composes to the right of the headline
    this.material.uniforms.uQShift.value = w >= 1024 ? 1.25 : 0;
  };

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else this.start();
  };

  /** 0..5 continuous formation index, driven by ScrollTrigger. */
  setProgress(p: number) {
    this.material.uniforms.uProgress.value = Math.max(0, Math.min(5, p));
  }

  /** Intro convergence 0..1 (LogoIntro drives this once). */
  setIntro(v: number) {
    this.material.uniforms.uIntro.value = v;
  }

  /** Normalized pointer −1..1 for parallax (desktop only). */
  setPointer(x: number, y: number) {
    this.pointerTarget.set(x, y);
  }

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.clock.start();
    const loop = () => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      const u = this.material.uniforms;
      u.uTime.value = this.clock.getElapsedTime();

      // gentle pointer parallax
      this.pointerCurrent.lerp(this.pointerTarget, 0.045);
      this.camera.position.x = this.pointerCurrent.x * 0.28;
      this.camera.position.y = -this.pointerCurrent.y * 0.18;
      this.camera.lookAt(0, 0, 0);

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

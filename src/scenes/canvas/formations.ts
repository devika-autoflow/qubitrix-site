/**
 * Precomputed particle formations. Each returns COUNT xyz triplets.
 * World space: camera at z=6, useful field ≈ x∈[-4.5,4.5] y∈[-2.6,2.6].
 *
 * Formation order drives the scroll journey (plan §10):
 * 0 Q-mark → 1 data stream → 2 black hole → 3 orbital → 4 starfield → 5 aurora
 */

const rand = (a = 1, b?: number) =>
  b === undefined ? Math.random() * a : a + Math.random() * (b - a);

/** Gaussian-ish (sum of 2 uniforms), centered 0, ~[-1,1]. */
const softRand = () => (Math.random() + Math.random() - 1);

/* ------------------------------------------------ */
/* 0 — The Q mark (matches public/brand/q-mark.svg)  */
/* ------------------------------------------------ */

interface Seg {
  len: number;
  point: (t: number) => [number, number];
}

function svgToWorld(x: number, y: number, s = 0.049): [number, number] {
  return [(x - 50) * s, (50 - y) * s];
}

export function qFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);

  const line = (x1: number, y1: number, x2: number, y2: number): Seg => ({
    len: Math.hypot(x2 - x1, y2 - y1),
    point: (t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t],
  });
  const arc = (cx: number, cy: number, r: number, a1: number, a2: number): Seg => ({
    len: Math.abs(a2 - a1) * r,
    point: (t) => {
      const a = a1 + (a2 - a1) * t;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    },
  });

  const D = Math.PI / 180;
  // Centerline of the Q stroke in SVG coords (y down), gap at bottom-right.
  const segs: Seg[] = [
    line(58, 91.5, 32.5, 91.5),
    arc(32.5, 67.5, 24, 90 * D, 180 * D),
    line(8.5, 67.5, 8.5, 32.5),
    arc(32.5, 32.5, 24, 180 * D, 270 * D),
    line(32.5, 8.5, 67.5, 8.5),
    arc(67.5, 32.5, 24, 270 * D, 360 * D),
    line(91.5, 32.5, 91.5, 63),
  ];
  const totalLen = segs.reduce((s, seg) => s + seg.len, 0);

  const strokeR = 6.5; // half of the 13-unit stroke, svg units
  const dotShare = 0.08;
  const ringCount = Math.floor(count * (1 - dotShare));

  let i = 0;
  for (; i < ringCount; i++) {
    let d = Math.random() * totalLen;
    let seg = segs[0];
    for (const s of segs) {
      if (d <= s.len) {
        seg = s;
        break;
      }
      d -= s.len;
    }
    const [px, py] = seg.point(d / seg.len);
    // jitter inside the stroke width, denser near the centerline
    const jr = strokeR * Math.sqrt(Math.random()) * 0.92;
    const ja = Math.random() * Math.PI * 2;
    const [wx, wy] = svgToWorld(px + Math.cos(ja) * jr, py + Math.sin(ja) * jr);
    out[i * 3] = wx;
    out[i * 3 + 1] = wy;
    out[i * 3 + 2] = softRand() * 0.06;
  }
  // the qubit dot
  for (; i < count; i++) {
    const jr = 7 * Math.sqrt(Math.random());
    const ja = Math.random() * Math.PI * 2;
    const [wx, wy] = svgToWorld(80.5 + Math.cos(ja) * jr, 87 + Math.sin(ja) * jr);
    out[i * 3] = wx;
    out[i * 3 + 1] = wy;
    out[i * 3 + 2] = softRand() * 0.06;
  }
  return out;
}

/* ------------------------------------------------ */
/* 1 — Data stream (horizontal wind)                 */
/* ------------------------------------------------ */
export function streamFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-6, 6);
    out[i * 3 + 1] = softRand() * 1.6;
    out[i * 3 + 2] = softRand() * 1.2;
  }
  return out;
}

/* ------------------------------------------------ */
/* 2 — Black hole (photon ring + accretion disk)     */
/* ------------------------------------------------ */
export function blackHoleFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const tilt = 1.08; // disk pitched toward the camera — Interstellar silhouette
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);

  let i = 0;

  // photon ring — the tight, bright halo hugging the event horizon
  const ringCount = Math.floor(count * 0.16);
  for (; i < ringCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 0.78 + softRand() * 0.045;
    out[i * 3] = Math.cos(a) * r;
    out[i * 3 + 1] = Math.sin(a) * r;
    out[i * 3 + 2] = softRand() * 0.04;
  }

  // accretion disk — spiral-streaked matter, dense inside, fraying outward
  const diskCount = Math.floor(count * 0.62);
  for (const end = i + diskCount; i < end; i++) {
    const r = 1.0 + 1.75 * Math.pow(Math.random(), 0.62);
    // spiral streaks: angle correlates with radius, three arms
    const arm = Math.floor(Math.random() * 3) * ((Math.PI * 2) / 3);
    const a = arm + r * 1.9 + softRand() * 0.55;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y = softRand() * 0.05 * (1 + (r - 1) * 0.4);
    // tilt the disk plane toward the viewer
    out[i * 3] = x;
    out[i * 3 + 1] = y * ct - z * st * 0.5;
    out[i * 3 + 2] = y * st + z * ct;
  }

  // faint infall haze + background stars
  for (; i < count; i++) {
    if (Math.random() < 0.5) {
      // haze spiraling toward the void (never inside the horizon r<0.55)
      const r = 0.9 + Math.random() * 2.1;
      const a = Math.random() * Math.PI * 2;
      out[i * 3] = Math.cos(a) * r;
      out[i * 3 + 1] = Math.sin(a) * r * 0.45 + softRand() * 0.2;
      out[i * 3 + 2] = softRand() * 0.8;
    } else {
      out[i * 3] = rand(-3.5, 3.5);
      out[i * 3 + 1] = rand(-2.15, 2.15);
      out[i * 3 + 2] = rand(-1.7, 0.7);
    }
  }
  return out;
}

/* ------------------------------------------------ */
/* 3 — Orbital system (core + 3 tilted rings)        */
/* ------------------------------------------------ */
export function orbitalFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const rings = [
    { r: 1.05, tilt: 0.42, share: 0.26 },
    { r: 1.62, tilt: -0.3, share: 0.28 },
    { r: 2.2, tilt: 0.12, share: 0.28 },
  ];
  const coreShare = 1 - rings.reduce((s, r) => s + r.share, 0);
  let i = 0;

  const coreCount = Math.floor(count * coreShare);
  for (; i < coreCount; i++) {
    const r = 0.34 * Math.pow(Math.random(), 0.5);
    const u = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const sq = Math.sqrt(1 - u * u);
    out[i * 3] = sq * Math.cos(phi) * r;
    out[i * 3 + 1] = u * r;
    out[i * 3 + 2] = sq * Math.sin(phi) * r;
  }

  for (const ring of rings) {
    const n = Math.floor(count * ring.share);
    const end = Math.min(i + n, count);
    for (; i < end; i++) {
      const a = Math.random() * Math.PI * 2;
      const jitter = softRand() * 0.05;
      const x = Math.cos(a) * (ring.r + jitter);
      let y = Math.sin(a) * (ring.r + jitter) * 0.38;
      let z = Math.sin(a) * (ring.r + jitter) * 0.62;
      // tilt around x-axis
      const cy = y * Math.cos(ring.tilt) - z * Math.sin(ring.tilt);
      const cz = y * Math.sin(ring.tilt) + z * Math.cos(ring.tilt);
      y = cy;
      z = cz;
      out[i * 3] = x;
      out[i * 3 + 1] = y + softRand() * 0.03;
      out[i * 3 + 2] = z;
    }
  }
  // any remainder → core
  for (; i < count; i++) {
    out[i * 3] = softRand() * 0.2;
    out[i * 3 + 1] = softRand() * 0.2;
    out[i * 3 + 2] = softRand() * 0.2;
  }
  return out;
}

/* ------------------------------------------------ */
/* 4 — Starfield                                     */
/* ------------------------------------------------ */
export function starFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-4.6, 4.6);
    out[i * 3 + 1] = rand(-2.8, 2.8);
    out[i * 3 + 2] = rand(-2.4, 1.6);
  }
  return out;
}

/* ------------------------------------------------ */
/* 5 — Aurora horizon (Strands look, plan §8)        */
/* ------------------------------------------------ */
export function auroraFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = rand(-4.8, 4.8);
    const band = Math.random() < 0.55 ? 1 : -1;
    const base = Math.sin(x * 0.72) * 0.62 * band;
    // wider ribbon, denser toward centerline, fading at edges
    const spread = 0.22 * (1 - Math.min(1, Math.abs(x) / 5)) + 0.03;
    out[i * 3] = x;
    out[i * 3 + 1] = -0.3 + base + softRand() * spread * 2.4;
    out[i * 3 + 2] = softRand() * 0.5;
  }
  return out;
}

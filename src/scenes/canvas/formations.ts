/**
 * Precomputed particle formations. Each returns COUNT xyz triplets.
 * World space: camera at z=6, useful field ≈ x∈[-4.5,4.5] y∈[-2.6,2.6].
 *
 * The scroll journey (user decision, redesigned): the Q assembles in the
 * Hero, then dissolves ONCE into an ambient floating field that persists,
 * unchanged in shape, for the rest of the page — only its color tint drifts
 * per section (see SceneManager's TINT chain). No further shape morphs.
 */

const rand = (a = 1, b?: number) =>
  b === undefined ? Math.random() * a : a + Math.random() * (b - a);

/** Gaussian-ish (sum of 2 uniforms), centered 0, ~[-1,1]. */
const softRand = () => (Math.random() + Math.random() - 1);

/* ------------------------------------------------ */
/* 0 — The Q mark (approximates the real mark in public/brand/q-mark.png) */
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
  // Params measured off the real brand mark (public/brand/q-mark.png): a
  // slimmer stroke, a tighter corner radius, and a smaller cut than the old
  // hand-drawn placeholder used.
  const r = 21;
  const segs: Seg[] = [
    line(73.5, 91.5, 29.5, 91.5),
    arc(29.5, 70.5, r, 90 * D, 180 * D),
    line(8.5, 70.5, 8.5, 29.5),
    arc(29.5, 29.5, r, 180 * D, 270 * D),
    line(29.5, 8.5, 70.5, 8.5),
    arc(70.5, 29.5, r, 270 * D, 360 * D),
    line(91.5, 29.5, 91.5, 78),
  ];
  const totalLen = segs.reduce((s, seg) => s + seg.len, 0);

  const strokeR = 5.6; // half the measured stroke width, svg units
  const dotShare = 0.055;
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
  // the qubit dot — the small separated tail piece, sitting just past the
  // main frame's bottom-right corner (matches the real mark's proportions).
  for (; i < count; i++) {
    const jr = 5.5 * Math.sqrt(Math.random());
    const ja = Math.random() * Math.PI * 2;
    const [wx, wy] = svgToWorld(91 + Math.cos(ja) * jr, 95 + Math.sin(ja) * jr);
    out[i * 3] = wx;
    out[i * 3 + 1] = wy;
    out[i * 3 + 2] = softRand() * 0.06;
  }
  return out;
}

/* ------------------------------------------------ */
/* 1 — Ambient float (the Q dissolves into this once, */
/* then it drifts gently for the rest of the journey) */
/* ------------------------------------------------ */
export function floatFormation(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-6, 6);
    out[i * 3 + 1] = softRand() * 1.6;
    out[i * 3 + 2] = softRand() * 1.2;
  }
  return out;
}

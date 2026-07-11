import { useEffect, useRef, useState } from "react";
import { labThreads } from "../../content/lab";
import { ScrollTrigger } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/caps";

const RING_RADII = [0.4, 0.66, 0.9]; // fraction of container half-size

const statusColor: Record<string, string> = {
  ACTIVE: "text-ok border-ok/30",
  EXPLORING: "text-plasma-tint border-plasma/30",
  INCUBATING: "text-warn border-warn/30",
};

/**
 * The orbital "planetary motion" map of technology threads (originally the
 * Active Stack set-piece): rAF-driven, pauses offscreen, keyboard-focusable
 * nodes, plain list fallback on mobile.
 */
export default function OrbitalMap() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeId, setActiveId] = useState(1);
  const activeRef = useRef(activeId);
  activeRef.current = activeId;

  const active = labThreads.find((t) => t.id === activeId) ?? labThreads[0];

  useEffect(() => {
    const container = orbitRef.current;
    if (!container || prefersReducedMotion()) return;

    let running = false;
    let raf = 0;
    const angles = labThreads.map((_, i) => (i / labThreads.length) * Math.PI * 2);
    const speeds = labThreads.map((_, i) => 0.00012 + (i % 3) * 0.00005);
    let last = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const dt = now - last;
      last = now;
      const rect = container.getBoundingClientRect();
      const half = rect.width / 2;
      labThreads.forEach((t, i) => {
        if (activeRef.current !== t.id) angles[i] += speeds[i] * dt;
        const r = RING_RADII[i % RING_RADII.length] * half;
        const x = Math.cos(angles[i]) * r;
        const y = Math.sin(angles[i]) * r * 0.92;
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      });
    };

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        running = self.isActive;
        if (running) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, []);

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_360px]">
        {/* Orbital — desktop */}
        <div className="hidden justify-center md:flex">
          <div
            ref={orbitRef}
            className="relative aspect-square w-full max-w-[520px]"
            role="group"
            aria-label="Research threads orbital map"
          >
            {/* scrim — quiets the canvas glow behind the map */}
            <div className="orbit-scrim absolute inset-[-12%]" aria-hidden="true" />
            {/* rings */}
            {RING_RADII.map((r) => (
              <div
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
                style={{ width: `${r * 100}%`, height: `${r * 92}%` }}
                aria-hidden="true"
              />
            ))}
            {/* core */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <div className="pulse-soft h-5 w-5 rounded-full bg-volt shadow-[0_0_36px_rgba(124,107,255,0.65)]" />
            </div>

            {/* nodes */}
            {labThreads.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                onClick={() => setActiveId(t.id)}
                aria-pressed={activeId === t.id}
                className="group absolute left-1/2 top-1/2 flex flex-col items-center"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-300 ${
                    activeId === t.id
                      ? "border-volt bg-obsidian-0 text-volt-tint shadow-[0_0_24px_rgba(124,107,255,0.4)]"
                      : "border-white/15 bg-obsidian-0 text-silver-400 group-hover:border-white/30"
                  }`}
                >
                  {String(t.id).padStart(2, "0")}
                </span>
                <span
                  className={`mt-2 whitespace-nowrap rounded-md border border-white/6 bg-obsidian-0/85 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] transition-colors ${
                    activeId === t.id ? "text-silver-100" : "text-silver-400"
                  }`}
                >
                  {t.title.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel (also the SR-friendly reading order) */}
        <div className="os-panel p-6 sm:p-7" aria-live="polite">
          <span
            className={`inline-block rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.14em] ${statusColor[active.status]}`}
          >
            {active.status}
          </span>
          <h3 className="metal-text font-display mt-4 text-xl font-semibold">{active.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-silver-400">{active.line}</p>
          {active.relatedIds.length > 0 && (
            <div className="mt-6 border-t hairline pt-4">
              <p className="hud-label mb-3">Connected threads</p>
              <div className="flex flex-wrap gap-2">
                {active.relatedIds.map((id) => {
                  const rel = labThreads.find((t) => t.id === id);
                  if (!rel) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveId(id)}
                      className="rounded-lg border border-white/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-silver-400 transition-colors hover:border-volt/40 hover:text-silver-100"
                    >
                      {rel.title.toUpperCase()} →
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile fallback — plain thread list */}
      <ul className="mt-8 space-y-3 md:hidden" aria-label="Research threads">
        {labThreads.map((t) => (
          <li key={t.id} className="os-panel p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-base font-semibold text-silver-100">{t.title}</p>
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] ${statusColor[t.status]}`}
              >
                {t.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-silver-400">{t.line}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

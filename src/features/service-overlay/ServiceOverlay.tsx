import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../content/services";
import Button from "../../components/ui/Button";
import { scrollToTarget } from "../../lib/lenis";

/**
 * Service dossier as an OS-window overlay with a real URL (/services/:slug)
 * so the journey stays continuous but pages stay shareable (plan §12).
 */
export default function ServiceOverlay({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navigate]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={`${service.title} dossier`}>
      <button
        aria-label="Close dossier"
        className="absolute inset-0 bg-obsidian-0/70 backdrop-blur-sm"
        onClick={() => navigate("/")}
        tabIndex={-1}
      />
      <div className="os-panel absolute right-0 top-0 flex h-full w-full max-w-lg flex-col overflow-y-auto rounded-none border-l border-white/10 p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="hud-label">SERVICE DOSSIER</p>
            <h2 className="metal-text font-display mt-3 text-3xl font-semibold">
              {service.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={() => navigate("/")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-silver-400 transition-colors hover:border-white/25 hover:text-silver-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-silver-400">{service.dossier.what}</p>

        <div className="mt-8">
          <p className="hud-label mb-3">Deliverables</p>
          <ul className="space-y-2.5">
            {service.dossier.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-silver-100">
                <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <p className="hud-label mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {service.dossier.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-silver-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t hairline pt-6">
          <p className="hud-label">Timeline</p>
          <p className="mt-2 text-sm text-silver-100">{service.dossier.timeline}</p>
        </div>

        <div className="mt-auto pt-10">
          <Button
            variant="primary"
            onClick={() => {
              navigate("/");
              setTimeout(() => scrollToTarget("#contact"), 60);
            }}
          >
            Discuss this system
          </Button>
        </div>
      </div>
    </div>
  );
}

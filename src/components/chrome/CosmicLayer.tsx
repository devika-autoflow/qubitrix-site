import { prefersReducedMotion } from "../../lib/caps";

/**
 * Astral backdrop between the particle canvas and the content:
 * night-sky star sheets + nebula wash + meteors crossing from both
 * horizons + a grid horizon under the hero.
 * Pure CSS — compositor-only animation, no JS per frame.
 */
export default function CosmicLayer() {
  const reduced = prefersReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="nebula-layer absolute inset-0" />
      <div className="star-sheet absolute inset-0" />
      <div className="star-sheet star-sheet--twinkle absolute inset-0" />
      {!reduced && (
        <>
          {/* meteors from the right horizon */}
          <span className="comet" style={{ top: "12%", right: "-160px", animationDelay: "1.5s" }} />
          <span className="comet" style={{ top: "34%", right: "-160px", animationDelay: "6s", animationDuration: "14s" }} />
          <span className="comet" style={{ top: "6%", right: "-160px", animationDelay: "9.5s", animationDuration: "9s" }} />
          <span className="comet" style={{ top: "52%", right: "-160px", animationDelay: "13s", animationDuration: "16s" }} />
          <span className="comet" style={{ top: "24%", right: "-160px", animationDelay: "17.5s", animationDuration: "12s" }} />
          <span className="comet comet--lg" style={{ top: "18%", right: "-280px", animationDelay: "4.5s", animationDuration: "8s" }} />
          <span className="comet comet--sm" style={{ top: "44%", right: "-100px", animationDelay: "11s", animationDuration: "18s" }} />
          <span className="comet comet--sm" style={{ top: "62%", right: "-100px", animationDelay: "20s", animationDuration: "15s" }} />
          {/* meteors from the left horizon */}
          <span className="comet comet--ltr" style={{ top: "9%", left: "-160px", animationDelay: "3.5s", animationDuration: "10s" }} />
          <span className="comet comet--ltr" style={{ top: "40%", left: "-160px", animationDelay: "8s", animationDuration: "15s" }} />
          <span className="comet comet--ltr" style={{ top: "20%", left: "-160px", animationDelay: "12.5s", animationDuration: "11s" }} />
          <span className="comet comet--ltr" style={{ top: "58%", left: "-160px", animationDelay: "16s", animationDuration: "13s" }} />
          <span className="comet comet--ltr comet--lg" style={{ top: "30%", left: "-280px", animationDelay: "6.5s", animationDuration: "9s" }} />
          <span className="comet comet--ltr comet--sm" style={{ top: "70%", left: "-100px", animationDelay: "14.5s", animationDuration: "17s" }} />
          <span className="comet comet--ltr comet--sm" style={{ top: "4%", left: "-100px", animationDelay: "19s", animationDuration: "14s" }} />
        </>
      )}
      <div className="grid-horizon absolute inset-x-[-10%] top-[62vh] h-[46vh] opacity-60" />
    </div>
  );
}

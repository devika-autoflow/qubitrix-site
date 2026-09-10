interface Props {
  kicker: string;
  index?: string;
  heading: string;
  sub?: string;
  align?: "left" | "center";
}

/** Mono kicker + metal display heading + optional sub. The OS voice (plan §7). */
export default function SectionHeading({
  kicker,
  index,
  heading,
  sub,
  align = "left",
}: Props) {
  return (
    <div className={align === "center" ? "text-center" : ""} data-reveal>
      <p className="hud-label flex items-center gap-3">
        {index && <span className="text-volt-tint">{index}</span>}
        <span
          className={`inline-block h-px w-8 bg-white/15 ${align === "center" ? "hidden" : ""}`}
          aria-hidden="true"
        />
        {kicker}
      </p>
      <h2 className="metal-text font-display mt-4 text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.06] tracking-tight">
        {heading}
      </h2>
      {sub && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed text-silver-400 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

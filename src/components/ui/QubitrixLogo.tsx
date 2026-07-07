interface Props {
  markSize?: number;
  withWordmark?: boolean;
  className?: string;
}

/** Vector brand lockup — crisp at any size, no black-box JPEG (plan blueprint step 3). */
export default function QubitrixLogo({
  markSize = 26,
  withWordmark = true,
  className = "",
}: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/brand/q-mark.svg"
        alt=""
        width={markSize}
        height={markSize}
        className="select-none"
        draggable={false}
      />
      {withWordmark && (
        <span
          className="metal-text font-display font-semibold tracking-[0.22em]"
          style={{ fontSize: markSize * 0.62 }}
        >
          QUBITRIX
        </span>
      )}
    </span>
  );
}

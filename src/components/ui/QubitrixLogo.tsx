interface Props {
  markSize?: number;
  withWordmark?: boolean;
  className?: string;
}

/**
 * The real Qubitrix brand mark — official lockup image (public/brand/), not a
 * redrawn approximation. `logo-wide.png` (mark + wordmark) when withWordmark
 * is true, `q-mark.png` (icon only) otherwise. Both are pre-cropped,
 * transparent-background PNGs derived from the owner-supplied master file.
 */
export default function QubitrixLogo({
  markSize = 26,
  withWordmark = true,
  className = "",
}: Props) {
  return withWordmark ? (
    <img
      src="/brand/logo-wide.webp"
      alt="Qubitrix"
      width={1106}
      height={347}
      style={{ height: markSize, width: "auto" }}
      className={`select-none ${className}`}
      draggable={false}
    />
  ) : (
    <img
      src="/brand/q-mark.webp"
      alt="Qubitrix"
      width={343}
      height={343}
      style={{ height: markSize, width: "auto" }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

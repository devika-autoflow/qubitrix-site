import { site } from "../../content/site";

/**
 * Icon links for the direct channels: email, LinkedIn, Instagram.
 * Inline SVGs (stroke = currentColor) so they tint with hover states.
 */

const ICONS: Record<string, JSX.Element> = {
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.9H3.6V20h2.9V8.9ZM5 7.6a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Zm5.6 1.3H7.8V20h2.9v-5.8c0-1.6.6-2.7 2.1-2.7 1.3 0 1.9.9 1.9 2.7V20h2.9v-6.4c0-3-1.4-4.9-4-4.9-1.6 0-2.7.8-3.1 1.7h-.1l-.1-1.5Z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.9 3H21l-6.78 7.74L22.2 21h-6.24l-4.89-6.4L5.47 21H2.32l7.25-8.28L1.8 3h6.4l4.42 5.85L17.9 3Zm-1.1 16.1h1.73L7.28 4.8H5.42l11.39 14.3Z" />
    </svg>
  ),
};

/** Map a site.ts social label to its icon key. */
function iconKey(label: string): keyof typeof ICONS | undefined {
  if (label.includes("LinkedIn")) return "LinkedIn";
  if (label.includes("Instagram")) return "Instagram";
  if (label.includes("X") || label.includes("Twitter")) return "X";
  return undefined;
}

interface Props {
  className?: string;
  /** Include the mailto icon (default true). */
  withEmail?: boolean;
  /** Reveal the channel name under the icon on hover/focus. */
  withLabels?: boolean;
}

export default function SocialIcons({ className = "", withEmail = true, withLabels = false }: Props) {
  const links = [
    ...(withEmail ? [{ label: "Email", href: `mailto:${site.email}`, external: false }] : []),
    ...site.socials.flatMap((s) => {
      const key = iconKey(s.label);
      return key ? [{ label: key, href: s.href, external: true }] : [];
    }),
  ];

  return (
    <ul className={`flex items-center gap-3 ${withLabels ? "pb-6" : ""} ${className}`}>
      {links.map((l) => (
        <li key={l.label} className="relative">
          <a
            href={l.href}
            aria-label={l.label}
            title={withLabels ? undefined : l.label}
            {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-silver-400 transition-all duration-200 hover:border-volt/50 hover:text-silver-100 hover:shadow-[0_0_18px_rgba(124,107,255,0.35)] focus-visible:border-volt/50"
          >
            <span className="h-[18px] w-[18px]">{ICONS[l.label]}</span>
            {withLabels && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap font-mono text-[9px] tracking-[0.14em] text-volt-tint opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {l.label.toUpperCase()}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

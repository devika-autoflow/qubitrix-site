import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dock from "./Dock";
import { nav } from "../../content/site";
import { scrollToTarget } from "../../lib/lenis";

const ICONS: Record<string, JSX.Element> = {
  Home: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m4 10.5 8-6.5 8 6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5" />
    </svg>
  ),
  Services: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
  "Quantum Edge": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" strokeLinejoin="round" />
      <path d="m4.5 12.5 7.5 4 7.5-4" strokeLinejoin="round" />
      <path d="m4.5 16.5 7.5 4 7.5-4" strokeLinejoin="round" />
    </svg>
  ),
  "Financial Impact": (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7 14 4-4 3 3 5-6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  FAQ: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.4a2.4 2.4 0 1 1 3.3 2.9c-.7.4-.9.8-.9 1.7" strokeLinecap="round" />
      <circle cx="12" cy="16.6" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  Proof: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
    </svg>
  ),
  Process: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="5.5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18.5" cy="12" r="2" />
      <path d="M7.5 12h2.5M14 12h2.5" />
    </svg>
  ),
  Contact: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  ),
};

const SECTION_ITEMS = [...nav, { label: "Contact", href: "#contact" }] as const;

/**
 * Floating bottom dock — primary section navigation (component sourced from
 * `qubitrix dump.txt`, React Bits Dock). Desktop and tablet; phones keep the
 * hamburger menu in the top bar.
 */
export default function DockNav() {
  const [active, setActive] = useState<string | null>(null);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-38% 0px -46% 0px" }
    );
    SECTION_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const goTo = (href: string) => {
    if (onHome) scrollToTarget(href);
    else window.location.assign(`/${href}`);
  };

  const items = SECTION_ITEMS.map((item) => ({
    icon: ICONS[item.label],
    label: item.label,
    onClick: () => goTo(item.href),
    active: active === item.href,
  }));

  return (
    <div className="fixed inset-x-0 top-[4.25rem] z-40 hidden justify-center md:flex">
      <Dock items={items} />
    </div>
  );
}

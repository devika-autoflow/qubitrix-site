import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QubitrixLogo from "../ui/QubitrixLogo";
import Button from "../ui/Button";
import { nav } from "../../content/site";
import { scrollToTarget } from "../../lib/lenis";

/** Fixed top bar — hides on scroll-down, returns on scroll-up (plan §11). */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/" || pathname.startsWith("/services");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.6);
      if (!open) setHidden(y > last && y > 140);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const goTo = (href: string) => {
    setOpen(false);
    if (onHome) scrollToTarget(href);
    else window.location.assign(`/${href}`);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-obsidian-2 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`transition-colors duration-300 ${
            solid ? "bg-obsidian-0/72 backdrop-blur-xl border-b hairline" : ""
          }`}
        >
          <nav
            className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
            aria-label="Primary"
          >
            <Link to="/" aria-label="Qubitrix home" onClick={() => setOpen(false)}>
              <QubitrixLogo markSize={24} />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {nav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => goTo(item.href)}
                  className="text-sm text-silver-400 transition-colors hover:text-silver-100"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="primary" onClick={() => goTo("#contact")}>
                Book a call
              </Button>
            </div>

            <button
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`h-px w-5 bg-silver-100 transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-silver-100 transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian-0/96 px-8 backdrop-blur-2xl md:hidden">
          <ul className="space-y-6">
            {nav.map((item, i) => (
              <li key={item.href}>
                <button
                  onClick={() => goTo(item.href)}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="hud-label text-volt-tint">0{i + 2}</span>
                  <span className="metal-text font-display text-3xl font-semibold">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
            <li className="pt-4">
              <Button variant="primary" onClick={() => goTo("#contact")}>
                Book a call
              </Button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

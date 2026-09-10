import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import QubitrixLogo from "../ui/QubitrixLogo";
import Button from "../ui/Button";
import QuantumButton from "./QuantumButton";
import AboutButton from "./AboutButton";
import { nav, site } from "../../content/site";
import { scrollToTarget } from "../../lib/lenis";
import { useSession, displayName } from "../../lib/useSession";

/**
 * Fixed top bar — hides on scroll-down, returns on scroll-up (plan §11).
 * Section links live in the bottom DockNav on md+; phones use the hamburger.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const session = useSession();

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
            className="mx-auto flex h-16 max-w-[86rem] items-center justify-between px-5 sm:px-8 lg:px-10"
            aria-label="Primary"
          >
            <Link to="/" aria-label="Qubitrix home" onClick={() => setOpen(false)}>
              <QubitrixLogo markSize={24} />
            </Link>

            <div className="hidden items-center gap-4 md:flex">
              <AboutButton />
              <QuantumButton />
              {session ? (
                <Link
                  to="/auth"
                  className="group flex items-center gap-2.5 text-sm text-silver-300 transition-colors hover:text-silver-100"
                  aria-label="Your account"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-obsidian-1/80 font-mono text-[11px] text-volt-tint">
                    {displayName(session).charAt(0)}
                  </span>
                  {displayName(session)}
                </Link>
              ) : (
                <>
                  <Button as="a" variant="ghost" href="/auth" className="!h-9 !px-5">
                    Log in
                  </Button>
                  <Button as="a" variant="ghost" href="/auth?mode=signup" className="!h-9 !px-5">
                    Sign up
                  </Button>
                </>
              )}
              {site.calendlyUrl ? (
                <Button as="a" variant="primary" href={site.calendlyUrl} target="_blank" rel="noreferrer">
                  Book a call
                </Button>
              ) : (
                <Button variant="primary" onClick={() => goTo("#contact")}>
                  Book a call
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <QuantumButton />
              <button
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
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
            </div>
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
                  <span className="hud-label text-volt-tint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="metal-text font-display text-3xl font-semibold">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 text-left"
              >
                <span className="hud-label text-volt-tint">{String(nav.length + 1).padStart(2, "0")}</span>
                <span className="metal-text font-display text-3xl font-semibold">About</span>
              </Link>
            </li>
            <li className="flex flex-wrap items-center gap-4 pt-4">
              {site.calendlyUrl ? (
                <Button as="a" variant="primary" href={site.calendlyUrl} target="_blank" rel="noreferrer">
                  Book a call
                </Button>
              ) : (
                <Button variant="primary" onClick={() => goTo("#contact")}>
                  Book a call
                </Button>
              )}
              {session ? (
                <Button as="a" variant="ghost" href="/auth" onClick={() => setOpen(false)}>
                  {displayName(session)} — account
                </Button>
              ) : (
                <>
                  <Button as="a" variant="ghost" href="/auth" onClick={() => setOpen(false)}>
                    Log in
                  </Button>
                  <Button as="a" variant="ghost" href="/auth?mode=signup" onClick={() => setOpen(false)}>
                    Sign up
                  </Button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

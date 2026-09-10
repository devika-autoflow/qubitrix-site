import { Link } from "react-router-dom";
import QubitrixLogo from "../ui/QubitrixLogo";
import SocialIcons from "../ui/SocialIcons";
import { site } from "../../content/site";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t hairline bg-obsidian-0/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <QubitrixLogo markSize={22} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver-600">
            {site.footerLine} AI agents, automation, and custom systems — built
            to run your business around the clock.
          </p>
        </div>

        <div>
          <p className="hud-label mb-4">Navigate</p>
          <ul className="space-y-2.5 text-sm text-silver-400">
            <li><Link className="hover:text-silver-100" to="/about">About</Link></li>
            <li><Link className="hover:text-silver-100" to="/work">Work</Link></li>
            <li><Link className="hover:text-silver-100" to="/book">Book a consultation</Link></li>
            <li><Link className="hover:text-silver-100" to="/auth">Sign in</Link></li>
            <li><Link className="hover:text-silver-100" to="/legal/privacy">Privacy</Link></li>
            <li><Link className="hover:text-silver-100" to="/legal/terms">Terms</Link></li>
            <li><Link className="hover:text-silver-100" to="/legal/cookies">Cookies</Link></li>
          </ul>
        </div>

        <div>
          <p className="hud-label mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-silver-400">
            <li>
              <a className="hover:text-silver-100" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            {site.whatsapp && (
              <li>
                <a
                  className="hover:text-silver-100"
                  href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {site.socials.map((s) => (
              <li key={s.label}>
                <a className="hover:text-silver-100" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <SocialIcons className="mt-5" />
        </div>
      </div>

      <div className="border-t hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 sm:px-8">
          <p className="font-mono text-[11px] tracking-[0.12em] text-silver-600">
            © {new Date().getFullYear()} QUBITRIX — ALL SYSTEMS OPERATIONAL
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-silver-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
            ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}

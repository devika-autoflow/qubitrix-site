import { useRef } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import BookingForm from "../../features/booking/BookingForm";
import SocialIcons from "../../components/ui/SocialIcons";
import { site } from "../../content/site";
import { useReveal } from "../../lib/useReveal";

/** Scene 07 — the aurora horizon. One aurora-border panel per plan §6 rule. */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 mx-auto max-w-6xl px-5 pb-[10vh] pt-[18vh] sm:px-8"
    >
      <SectionHeading
        index="08"
        kicker="FINAL CALL TO ACTION"
        heading="Let's Put Your Business on Autopilot."
        sub="Book a free 30-minute strategy call. No pressure, just clear answers on what you can automate and how much you'll save."
      />

      <div
        data-reveal
        className="btn-aurora-border os-panel mt-12 rounded-3xl p-7 shadow-[0_0_80px_rgba(124,107,255,0.08)] sm:p-10"
      >
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          <div>
            <p className="hud-label mb-5">Direct channels</p>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-silver-100 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </li>
              {site.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-silver-100 underline-offset-4 hover:underline"
                  >
                    WhatsApp — instant reply
                  </a>
                </li>
              )}
            </ul>
            <p className="hud-label mb-4 mt-8">Follow the signal</p>
            <SocialIcons withEmail={false} withLabels />
            <div className="mt-8 space-y-1.5 border-t hairline pt-5">
              <p className="font-mono text-[11px] tracking-[0.12em] text-silver-600">
                {site.hours}
              </p>
              <p className="font-mono text-[11px] tracking-[0.12em] text-silver-600">
                {site.location}
              </p>
            </div>
            {site.calendlyUrl && (
              <p className="mt-8 text-sm text-silver-400">
                Prefer a calendar?{" "}
                <Link to="/book" className="text-volt-tint hover:underline">
                  Pick a slot →
                </Link>
              </p>
            )}
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import SectionHeading from "../components/ui/SectionHeading";
import BookingForm from "../features/booking/BookingForm";
import RequestBuilder from "../features/request-builder/RequestBuilder";
import Button from "../components/ui/Button";
import { site } from "../content/site";

export default function Book() {
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-32 sm:px-8">
        <SectionHeading
          kicker="Book a consultation"
          heading="30 minutes. Zero cost. Full clarity."
          sub="We'll map where automation and AI create the most leverage in your business — and leave you with next steps either way."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="os-panel p-7 sm:p-9">
            <BookingForm source="book-page" />
          </div>

          <div className="space-y-6">
            {site.calendlyUrl ? (
              <div className="os-panel p-7">
                <p className="hud-label mb-3">Prefer a calendar?</p>
                <p className="text-sm text-silver-400">Pick a slot directly:</p>
                <Button
                  as="a"
                  href={site.calendlyUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  className="mt-5"
                >
                  Open calendar
                </Button>
              </div>
            ) : null}

            <div className="os-panel p-7">
              <p className="hud-label mb-3">Know what you need?</p>
              <p className="text-sm text-silver-400">
                Configure the exact system in three steps — we'll arrive at the call with a blueprint.
              </p>
              <Button variant="ghost" className="mt-5" onClick={() => setBuilderOpen(true)}>
                Configure a solution
              </Button>
            </div>

            <div className="os-panel p-7">
              <p className="hud-label mb-3">Direct</p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-silver-100 underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-silver-600">
                {site.hours}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {builderOpen && <RequestBuilder onClose={() => setBuilderOpen(false)} />}
    </>
  );
}

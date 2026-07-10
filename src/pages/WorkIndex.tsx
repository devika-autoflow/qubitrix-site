import { Link } from "react-router-dom";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import SectionHeading from "../components/ui/SectionHeading";
import GlowCard from "../components/ui/GlowCard";
import { work, workIntro } from "../content/work";
import { useNavigate } from "react-router-dom";

export default function WorkIndex() {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <SectionHeading
          kicker={workIntro.kicker}
          heading={workIntro.heading}
          sub={workIntro.sub}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {work.map((w) => (
            <GlowCard
              key={w.slug}
              className="flex h-full flex-col p-7"
              onClick={() => navigate(`/work/${w.slug}`)}
              ariaLabel={`Open case study: ${w.title}`}
            >
              {w.images?.[0] && (
                <div className="-mx-7 -mt-7 mb-6 overflow-hidden rounded-t-3xl border-b hairline">
                  <img
                    src={w.images[0].src}
                    alt={w.images[0].alt}
                    loading="lazy"
                    className="h-40 w-full object-cover object-left-top"
                  />
                </div>
              )}
              <p className="hud-label">{w.index} — {w.kind}</p>
              <h2 className="metal-text font-display mt-4 text-xl font-semibold">{w.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-silver-400">{w.outcome}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {w.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/8 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-silver-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
        <p className="mt-12 text-sm text-silver-600">
          Client case studies land here as they complete.{" "}
          <Link to="/book" className="text-volt-tint hover:underline">
            Yours could be next →
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

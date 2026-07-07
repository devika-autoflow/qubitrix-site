import { Link, useParams } from "react-router-dom";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import Button from "../components/ui/Button";
import { work } from "../content/work";
import NotFound from "./NotFound";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = work.find((w) => w.slug === slug);
  if (!item) return <NotFound />;

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          to="/work"
          className="font-mono text-[11px] tracking-[0.14em] text-silver-600 transition-colors hover:text-silver-100"
        >
          ← ALL BUILDS
        </Link>

        <p className="hud-label mt-8">{item.index} — {item.kind}</p>
        <h1 className="metal-text font-display mt-3 text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-tight">
          {item.title}
        </h1>
        <p className="mt-4 text-lg text-silver-400">{item.outcome}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {item.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-silver-400"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-14 space-y-12">
          {(
            [
              ["THE PROBLEM", item.problem],
              ["THE BUILD", item.build],
              ["THE RESULT", item.result],
            ] as const
          ).map(([label, body]) => (
            <section key={label}>
              <p className="hud-label">{label}</p>
              <p className="mt-3 leading-relaxed text-silver-100">{body}</p>
            </section>
          ))}
        </div>

        <div className="os-panel mt-16 flex flex-wrap items-center justify-between gap-5 p-7">
          <p className="text-sm text-silver-400">Want a system like this running for you?</p>
          <Button as="a" href="/book" variant="primary">
            Book a free consultation
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

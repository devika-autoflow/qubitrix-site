import { useParams } from "react-router-dom";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import { legalDocs } from "../content/legal";
import NotFound from "./NotFound";

export default function Legal() {
  const { doc } = useParams<{ doc: string }>();
  const legal = legalDocs.find((d) => d.slug === doc);
  if (!legal) return <NotFound />;

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-2xl px-5 pb-24 pt-32 sm:px-8">
        <p className="hud-label">LEGAL — UPDATED {legal.updated.toUpperCase()}</p>
        <h1 className="metal-text font-display mt-3 text-3xl font-semibold sm:text-4xl">
          {legal.title}
        </h1>
        <div className="mt-10 space-y-8">
          {legal.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg font-semibold text-silver-100">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-silver-400">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

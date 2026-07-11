import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import Button from "../components/ui/Button";
import NotFound from "./NotFound";
import { services } from "../content/services";

/**
 * Full service detail page (/services/:slug). Each card in the Services
 * grid opens one of these with the complete dossier.
 */
export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  return (
    <>
      <Nav />
      <main id="main" className="relative min-h-screen overflow-hidden">
        {/* astral backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="nebula-layer absolute inset-0" />
          <div className="grid-horizon absolute inset-x-[-10%] top-[60vh] h-[50vh] opacity-40" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="hud-label">
              <span className="text-volt-tint">SERVICE</span>
              <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-white/15" aria-hidden="true" />
              COMPLETE DETAILS
            </p>
            <h1 className="metal-text font-display mt-5 text-[clamp(2.4rem,5.5vw,4.2rem)] font-semibold leading-[1.04] tracking-tight">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-silver-400">{service.value}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-silver-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-14 space-y-10"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="os-panel rounded-3xl p-7 sm:p-9">
              <p className="hud-label mb-4">What it does</p>
              <p className="max-w-2xl text-base leading-relaxed text-silver-100">
                {service.dossier.what}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="os-panel rounded-3xl p-7 sm:p-8">
                <p className="hud-label mb-4">Deliverables</p>
                <ul className="space-y-3">
                  {service.dossier.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-sm text-silver-100">
                      <span
                        className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-volt"
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <div className="os-panel flex-1 rounded-3xl p-7 sm:p-8">
                  <p className="hud-label mb-4">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {service.dossier.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-silver-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="os-panel rounded-3xl p-7 sm:p-8">
                  <p className="hud-label">Timeline</p>
                  <p className="mt-2 text-base font-medium text-silver-100">
                    {service.dossier.timeline}
                  </p>
                </div>
              </div>
            </div>

            <div className="btn-aurora-border os-panel flex flex-col gap-6 rounded-3xl p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <h2 className="metal-text font-display text-2xl font-semibold">
                  Ready to deploy this system?
                </h2>
                <p className="mt-2 text-sm text-silver-400">
                  Book a free strategy call and we'll map it to your business.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => window.location.assign("/#contact")}
              >
                Book a Free Strategy Call
              </Button>
            </div>

            <p className="text-sm text-silver-600">
              <a href="/#capabilities" className="text-volt-tint hover:underline">
                ← Back to all services
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

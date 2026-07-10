import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import GlowCard from "../components/ui/GlowCard";
import Button from "../components/ui/Button";
import { blog, blogIntro } from "../content/blog";

/** CSS atom — three tilted electron orbits around a glowing nucleus. */
function QuantumAtom({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt shadow-[0_0_50px_rgba(124,107,255,0.9),0_0_120px_rgba(124,107,255,0.4)]" />
      {[0, 60, -60].map((tilt, i) => (
        <motion.span
          key={tilt}
          className="absolute inset-0 rounded-full border border-volt/25"
          style={{ scaleY: 0.38, rotate: tilt }}
          animate={reduced ? undefined : { rotate: tilt + 360 }}
          transition={{ duration: 14 + i * 6, ease: "linear", repeat: Infinity }}
        >
          <span
            className={`absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${
              i === 1 ? "bg-plasma shadow-[0_0_12px_var(--color-plasma)]" : "bg-volt-tint shadow-[0_0_12px_var(--color-volt)]"
            }`}
          />
        </motion.span>
      ))}
      {/* probability cloud */}
      <span className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(124,107,255,0.14),transparent_65%)]" />
    </div>
  );
}

/** The Quantum Core — a full destination page, not a popover. */
export default function Quantum() {
  const navigate = useNavigate();
  const reduced = useReducedMotion() ?? false;

  return (
    <>
      <Nav />
      <main id="main" className="relative min-h-screen overflow-hidden">
        {/* astral backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="nebula-layer absolute inset-0" />
          <div className="grid-horizon absolute inset-x-[-10%] top-[58vh] h-[50vh] opacity-50" />
        </div>

        {/* Hero */}
        <section className="relative mx-auto grid max-w-[86rem] items-center gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:px-10 lg:pb-24 lg:pt-40">
          <div>
            <motion.p
              className="hud-label text-volt-tint"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {blogIntro.kicker} — JOURNAL
            </motion.p>
            <motion.h1
              className="metal-text font-display mt-5 text-[clamp(2.6rem,6.5vw,4.8rem)] font-semibold leading-[1.02] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              {blogIntro.heading}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-silver-400 sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              {blogIntro.sub}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <Button variant="primary" onClick={() => navigate("/book")}>
                Build on the frontier
              </Button>
              <Button variant="ghost" as="a" href="#entries">
                Read the entries
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <QuantumAtom reduced={reduced} />
          </motion.div>
        </section>

        {/* Entries */}
        <section id="entries" className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 lg:px-10">
          <p className="hud-label mb-8">
            <span className="text-volt-tint">LOG</span>
            <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-white/15" aria-hidden="true" />
            {blog.length} ENTRIES
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {blog.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              >
                <GlowCard
                  className="flex h-full flex-col p-7"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  ariaLabel={`Read article: ${post.title}`}
                >
                  <p className="hud-label">
                    {post.index} — {post.tag} · {post.minutes} MIN READ
                  </p>
                  <h2 className="metal-text font-display mt-4 text-xl font-semibold">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-silver-400">{post.excerpt}</p>
                  <span className="mt-auto pt-6 text-sm text-volt-tint">Read entry →</span>
                </GlowCard>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-sm text-silver-600">
            New entries land as the frontier moves.{" "}
            <Link to="/" className="text-volt-tint hover:underline">
              ← Back to the journey
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

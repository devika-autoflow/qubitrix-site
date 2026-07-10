import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import { blog } from "../content/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blog.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const next = blog[(blog.indexOf(post) + 1) % blog.length];

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="hud-label">
            <span className="text-volt-tint">{post.index}</span>
            <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-white/15" aria-hidden="true" />
            {post.tag} · {post.minutes} MIN READ
          </p>
          <h1 className="metal-text font-display mt-5 text-[clamp(2rem,5.5vw,3.4rem)] font-semibold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-silver-400">{post.excerpt}</p>

          <div className="mt-10 space-y-6 border-t hairline pt-10">
            {post.body.map((para) => (
              <p key={para.slice(0, 32)} className="leading-relaxed text-silver-100/90">
                {para}
              </p>
            ))}
          </div>
        </motion.article>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-8">
          <Link to="/quantum" className="text-sm text-silver-400 hover:text-silver-100">
            ← All entries
          </Link>
          <Link to={`/blog/${next.slug}`} className="text-sm text-volt-tint hover:underline">
            Next: {next.title} →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

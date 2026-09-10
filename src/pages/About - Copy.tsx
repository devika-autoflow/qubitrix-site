import { motion } from "framer-motion";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import GlowCard from "../components/ui/GlowCard";
import Button from "../components/ui/Button";
import {
  aboutIntro,
  aboutStory,
  aboutWhatWeDo,
  aboutPhilosophy,
  aboutMission,
  aboutResearch,
  aboutVision,
  aboutPromise,
  team,
  type TeamMember,
} from "../content/about";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

/** A kicker + heading + body block, reused across the story sections. */
function StoryBlock({
  kicker,
  heading,
  text,
  tag,
}: {
  kicker: string;
  heading: string;
  text: string;
  tag?: string;
}) {
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl">
      <p className="hud-label text-volt-tint">{kicker}</p>
      <h2 className="metal-text font-display mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight">
        {heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-silver-400 sm:text-lg">{text}</p>
      {tag && <p className="mt-5 text-sm text-volt-tint">{tag}</p>}
    </motion.div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** One team member card — used for both the leadership row and the team row. */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <GlowCard className="flex h-full flex-col gap-4 p-7">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="h-16 w-16 shrink-0 rounded-full border border-white/10 object-cover object-top"
        />
      ) : (
        <span
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-obsidian-2/80 font-mono text-lg text-volt-tint"
          aria-hidden="true"
        >
          {initials(member.name)}
        </span>
      )}
      <div>
        <h3 className="metal-text font-display text-xl font-semibold tracking-tight">{member.name}</h3>
        <p className="hud-label mt-1 text-volt-tint">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-silver-400">{member.bio}</p>
      </div>
    </GlowCard>
  );
}

export default function About() {
  const [devika, legith, ...rest] = team;
  const leadership = [devika, legith];

  return (
    <>
      <Nav />
      <main id="main" className="relative min-h-screen overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="nebula-layer absolute inset-0" />
        </div>

        {/* Hero */}
        <section className="relative mx-auto max-w-[60rem] px-5 pb-16 pt-32 text-center sm:px-8 lg:pb-24 lg:pt-40">
          <motion.p
            className="hud-label text-volt-tint"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {aboutIntro.kicker}
          </motion.p>
          <motion.h1
            className="metal-text font-display mt-5 text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            {aboutIntro.heading}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver-400 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {aboutIntro.sub}
          </motion.p>
        </section>

        {/* Brand story */}
        <section className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 lg:px-10">
          <StoryBlock
            kicker="OUR STORY"
            heading={aboutStory.heading}
            text={aboutStory.paragraphs[0]}
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-silver-400 sm:text-lg"
          >
            {aboutStory.paragraphs[1]}
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-6 max-w-3xl text-sm text-volt-tint"
          >
            {aboutStory.tag}
          </motion.p>
        </section>

        {/* What we do / Philosophy / Mission / Research — alternating blocks */}
        <section className="relative mx-auto max-w-[86rem] space-y-20 px-5 pb-24 sm:px-8 lg:px-10">
          <StoryBlock {...aboutWhatWeDo} />
          <StoryBlock {...aboutPhilosophy} />
          <StoryBlock {...aboutMission} />
          <StoryBlock {...aboutResearch} tag={aboutResearch.tag} />
        </section>

        {/* Team */}
        <section id="team" className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 lg:px-10">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
            <p className="hud-label text-volt-tint">MEET THE TEAM</p>
            <h2 className="metal-text font-display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold">
              The people building Qubitrix.
            </h2>
          </motion.div>

          {/* Leadership — Devika + Legith, matched side by side */}
          <p className="hud-label mt-14 text-volt-tint">LEADERSHIP</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {leadership.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <p className="hud-label mt-12 text-volt-tint">TEAM</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {rest.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="relative mx-auto max-w-[86rem] px-5 pb-24 sm:px-8 lg:px-10">
          <StoryBlock {...aboutVision} />
        </section>

        {/* Promise + CTA */}
        <section className="relative mx-auto max-w-[60rem] px-5 pb-28 text-center sm:px-8 lg:pb-32">
          <motion.p {...fadeUp} transition={{ duration: 0.5 }} className="hud-label text-volt-tint">
            {aboutPromise.kicker}
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="metal-text font-display mt-4 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold"
          >
            {aboutPromise.heading}
          </motion.h2>
          <div className="mx-auto mt-6 max-w-xl space-y-2">
            {aboutPromise.lines.map((line) => (
              <motion.p
                key={line}
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base leading-relaxed text-silver-400 sm:text-lg"
              >
                {line}
              </motion.p>
            ))}
          </div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="metal-text font-display mt-8 text-xl font-semibold"
          >
            {aboutPromise.tagline}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button as="a" variant="primary" href="/book">
              Book a Free Strategy Call
            </Button>
            <Button as="a" variant="ghost" href="/">
              ← Back to home
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

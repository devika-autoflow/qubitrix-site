import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SceneCanvas, { getScene } from "../scenes/canvas/SceneCanvas";
import LogoIntro from "../components/chrome/LogoIntro";
import Nav from "../components/chrome/Nav";
import ProgressRail from "../components/chrome/ProgressRail";
import ScrollAura from "../components/chrome/ScrollAura";
import Footer from "../components/chrome/Footer";
import Hero from "../scenes/sections/Hero";
import Shift from "../scenes/sections/Shift";
import Capabilities from "../scenes/sections/Capabilities";
import Lab from "../scenes/sections/Lab";
import Work from "../scenes/sections/Work";
import Process from "../scenes/sections/Process";
import Testimonials from "../scenes/sections/Testimonials";
import Contact from "../scenes/sections/Contact";
import CosmicLayer from "../components/chrome/CosmicLayer";
import ServiceOverlay from "../features/service-overlay/ServiceOverlay";
import { ScrollTrigger } from "../lib/gsap";

/**
 * Formation target per section — each formation lives for TWO sections
 * (user decision, July 2026): it forms entering the first section, stays
 * fully built through both, then crumples into the next formation.
 * hero=Q(0) → shift=stream(1) → capabilities+lab=orbital(2)
 * → work+process=starfield(3) → testimonials+contact=aurora(4)
 */
const JOURNEY: Array<[string, number]> = [
  ["#hero", 0],
  ["#shift", 1],
  ["#capabilities", 2],
  ["#lab", 2],
  ["#work", 3],
  ["#process", 3],
  ["#testimonials", 4],
  ["#contact", 4],
];

export default function Home() {
  const { slug } = useParams<{ slug?: string }>();

  // Drive the canvas through the journey. Created after children mount
  // so section pins are already in place, then refreshed once.
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    const raf = requestAnimationFrame(() => {
      for (let i = 1; i < JOURNEY.length; i++) {
        const [sel, target] = JOURNEY[i];
        const prev = JOURNEY[i - 1][1];
        if (target === prev) continue;
        const el = document.querySelector(sel);
        if (!el) continue;
        // The previous formation must stay fully formed through all the blank
        // space between sections — visitors should SEE the shape, not a
        // crumble. So the morph fires late (next section already at mid
        // viewport) and finishes fast, giving each formation a long plateau.
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "top 12%",
            onUpdate: (self) => {
              getScene()?.setProgress(prev + (target - prev) * self.progress);
            },
          })
        );
      }
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <LogoIntro />
      <SceneCanvas />
      <CosmicLayer />
      <ScrollAura />
      <Nav />
      <ProgressRail />

      <main id="main">
        <Hero />
        <Shift />
        <Capabilities />
        <Lab />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {slug && <ServiceOverlay slug={slug} />}
    </>
  );
}

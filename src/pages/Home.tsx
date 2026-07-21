import { useEffect } from "react";
import SceneCanvas, { getScene } from "../scenes/canvas/SceneCanvas";
import LogoIntro from "../components/chrome/LogoIntro";
import Nav from "../components/chrome/Nav";
import ProgressRail from "../components/chrome/ProgressRail";
import ScrollAura from "../components/chrome/ScrollAura";
import Footer from "../components/chrome/Footer";
import Hero from "../scenes/sections/Hero";
import Capabilities from "../scenes/sections/Capabilities";
import Impact from "../scenes/sections/Impact";
import Edge from "../scenes/sections/Edge";
import Process from "../scenes/sections/Process";
import Proof from "../scenes/sections/Proof";
import Faq from "../scenes/sections/Faq";
import Contact from "../scenes/sections/Contact";
import CosmicLayer from "../components/chrome/CosmicLayer";
import { ScrollTrigger } from "../lib/gsap";

/**
 * Section index per anchor — drives the canvas (user decision, redesigned):
 * the Q assembles in the Hero, dissolves once entering Capabilities, then
 * stays an ambient floating field for the rest of the page. Past that
 * dissolve, this index only steers a slow color-tint drift — never another
 * shape change.
 */
const JOURNEY: Array<[string, number]> = [
  ["#hero", 0],
  ["#capabilities", 1],
  ["#impact", 2],
  ["#edge", 3],
  ["#process", 4],
  ["#proof", 5],
  ["#faq", 6],
  ["#contact", 7],
];

export default function Home() {
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
        <Capabilities />
        <Impact />
        <Edge />
        <Process />
        <Proof />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

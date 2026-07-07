import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SceneCanvas, { getScene } from "../scenes/canvas/SceneCanvas";
import LogoIntro from "../components/chrome/LogoIntro";
import Nav from "../components/chrome/Nav";
import ProgressRail from "../components/chrome/ProgressRail";
import Footer from "../components/chrome/Footer";
import Hero from "../scenes/sections/Hero";
import Shift from "../scenes/sections/Shift";
import Capabilities from "../scenes/sections/Capabilities";
import Lab from "../scenes/sections/Lab";
import Work from "../scenes/sections/Work";
import Process from "../scenes/sections/Process";
import Contact from "../scenes/sections/Contact";
import ServiceOverlay from "../features/service-overlay/ServiceOverlay";
import { ScrollTrigger } from "../lib/gsap";

/**
 * Formation target per section (plan §10):
 * hero=Q(0) → shift=stream(1) → capabilities=lattice(2) → lab=orbital(3)
 * → work=starfield(4) → process=starfield(4) → contact=aurora(5)
 */
const JOURNEY: Array<[string, number]> = [
  ["#hero", 0],
  ["#shift", 1],
  ["#capabilities", 2],
  ["#lab", 3],
  ["#work", 4],
  ["#process", 4],
  ["#contact", 5],
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
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            end: "top 28%",
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
      <Nav />
      <ProgressRail />

      <main id="main">
        <Hero />
        <Shift />
        <Capabilities />
        <Lab />
        <Work />
        <Process />
        <Contact />
      </main>

      <Footer />

      {slug && <ServiceOverlay slug={slug} />}
    </>
  );
}

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import Book from "./pages/Book";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import ConsoleLauncher from "./features/console/ConsoleLauncher";
import { initLenis, getLenis } from "./lib/lenis";

/** Scroll to top on route change — except the / ↔ /services overlay swap (plan §12). */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const isJourney = pathname === "/" || pathname.startsWith("/services");
    if (!isJourney) {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<Home />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        <Route path="/book" element={<Book />} />
        <Route path="/legal/:doc" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ConsoleLauncher />
    </BrowserRouter>
  );
}

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import WorkIndex from "./pages/WorkIndex";
import WorkDetail from "./pages/WorkDetail";
import Book from "./pages/Book";
import Quantum from "./pages/Quantum";
import BlogPost from "./pages/BlogPost";
import DockNav from "./components/chrome/DockNav";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
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
        <Route path="/quantum" element={<Quantum />} />
        <Route path="/blog" element={<Navigate to="/quantum" replace />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/update-password" element={<UpdatePassword />} />
        <Route path="/legal/:doc" element={<Legal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <DockNav />
      <ConsoleLauncher />
    </BrowserRouter>
  );
}

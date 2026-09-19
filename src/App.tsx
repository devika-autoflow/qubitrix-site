import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import DockNav from "./components/chrome/DockNav";
import ConsoleLauncher from "./features/console/ConsoleLauncher";
import ConsentBanner from "./components/chrome/ConsentBanner";
import { initLenis, getLenis } from "./lib/lenis";

/**
 * Home stays eagerly imported — it is the LCP route and owns the WebGL canvas.
 * Every other route is code-split, so a visitor landing on /book or /legal
 * never downloads three.js, the work gallery, or the auth pages.
 */
const About = lazy(() => import("./pages/About"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const WorkIndex = lazy(() => import("./pages/WorkIndex"));
const WorkDetail = lazy(() => import("./pages/WorkDetail"));
const Book = lazy(() => import("./pages/Book"));
const Demo = lazy(() => import("./pages/Demo"));
const Quantum = lazy(() => import("./pages/Quantum"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Legal = lazy(() => import("./pages/Legal"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));

/** Scroll to top on route change. */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

/** DockNav and the Ask Qubi console are site chrome — hidden on standalone/transactional pages. */
function GlobalChrome() {
  const { pathname } = useLocation();
  if (pathname === "/unsubscribe") return null;
  return (
    <>
      <DockNav />
      <ConsoleLauncher />
    </>
  );
}

/** Route chunks land in a few hundred ms — a dark hold beats a flashing spinner. */
function RouteFallback() {
  return <div aria-hidden="true" className="min-h-screen" style={{ background: "#040407" }} />;
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/book" element={<Book />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/quantum" element={<Quantum />} />
          <Route path="/blog" element={<Navigate to="/quantum" replace />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/reset" element={<ResetPassword />} />
          <Route path="/auth/update-password" element={<UpdatePassword />} />
          <Route path="/legal/:doc" element={<Legal />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <GlobalChrome />
      <ConsentBanner />
    </BrowserRouter>
  );
}

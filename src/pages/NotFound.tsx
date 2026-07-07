import { Link } from "react-router-dom";
import Nav from "../components/chrome/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="flex min-h-screen flex-col items-center justify-center px-5 text-center"
      >
        <span className="qubit-dot mb-8 !h-3 !w-3" aria-hidden="true" />
        <p className="hud-label">ERROR 404</p>
        <h1 className="metal-text font-display mt-4 text-4xl font-semibold sm:text-5xl">
          Signal lost.
        </h1>
        <p className="mt-4 max-w-sm text-sm text-silver-400">
          This coordinate doesn't exist in the system. The dot searched everywhere.
        </p>
        <Link
          to="/"
          className="mt-10 font-mono text-[11px] tracking-[0.14em] text-volt-tint hover:text-silver-100"
        >
          RETURN TO BASE →
        </Link>
      </main>
    </>
  );
}

import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import AuthShell, { AuthNotice } from "../features/auth/AuthShell";
import Button from "../components/ui/Button";
import { TextField } from "../components/ui/Field";
import { getSupabase } from "../lib/supabase";
import { displayName } from "../lib/useSession";

type Mode = "signin" | "signup";

const GoogleMark = (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.8Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.13 0-5.78-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.28a7.2 7.2 0 0 1 0-4.56v-3.1H1.28a12 12 0 0 0 0 10.76l4-3.1Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.77c1.76 0 3.35.6 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 1.28 6.62l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
    />
  </svg>
);

export default function Auth() {
  const supabase = getSupabase();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "signin");
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) {
    return (
      <AuthShell kicker="Access" heading="Auth is not configured yet.">
        <p className="text-sm leading-relaxed text-silver-400">
          Set <code className="font-mono text-xs">VITE_SUPABASE_URL</code> and{" "}
          <code className="font-mono text-xs">VITE_SUPABASE_ANON_KEY</code> in{" "}
          <code className="font-mono text-xs">.env</code>, then restart the dev server.
        </p>
      </AuthShell>
    );
  }

  const signInWithGoogle = async () => {
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
    if (err) {
      setError(err.message);
      setBusy(false);
    }
    // on success the browser navigates away to Google
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const fullName = String(form.get("fullName") ?? "").trim();
    if (!email || !password) return;

    setBusy(true);
    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
    } else {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          // stored in user_metadata — the nav greets people by this name
          data: fullName ? { full_name: fullName } : undefined,
        },
      });
      if (err) setError(err.message);
      else if (!data.session)
        setNotice("Account created. Check your inbox for the confirmation link.");
    }
    setBusy(false);
  };

  if (session) {
    return (
      <AuthShell
        kicker="Access"
        heading={`Welcome back, ${displayName(session)}.`}
        sub="This browser holds an active QUBITRIX session — no need to sign in again."
      >
        <div className="rounded-xl border border-white/10 bg-obsidian-1/80 px-4 py-3">
          <p className="hud-label mb-1">Identity</p>
          <p className="text-sm text-silver-100">{session.user.email ?? session.user.id}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button as="a" href="/" variant="primary">
            Back to the site
          </Button>
          <Button
            variant="ghost"
            onClick={() => void supabase.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      kicker="Access"
      heading={mode === "signin" ? "Enter the system." : "Create your access."}
      sub={
        mode === "signin"
          ? "Sign in to continue where you left off."
          : "One account across every QUBITRIX surface."
      }
    >
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-obsidian-1/80 px-6 py-3 text-sm font-medium text-silver-100 transition-all duration-200 hover:border-white/25 hover:bg-obsidian-2 disabled:opacity-40"
      >
        {GoogleMark}
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[10px] tracking-[0.16em] text-silver-600">OR</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={(e) => void onSubmit(e)} className="space-y-5">
        {mode === "signup" && (
          <TextField
            label="Name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        )}
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
        <div>
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="••••••••"
            minLength={8}
            required
          />
          {mode === "signin" && (
            <p className="mt-2 text-right">
              <Link
                to="/auth/reset"
                className="text-xs text-silver-400 underline-offset-4 hover:text-silver-100 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          )}
        </div>

        <Button variant="primary" className="w-full" disabled={busy}>
          {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
        </Button>
      </form>

      {error && <AuthNotice tone="err">{error}</AuthNotice>}
      {notice && <AuthNotice tone="ok">{notice}</AuthNotice>}

      <p className="mt-6 text-center text-sm text-silver-400">
        {mode === "signin" ? "New here?" : "Already have access?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="text-volt-tint underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </AuthShell>
  );
}

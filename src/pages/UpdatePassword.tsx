import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell, { AuthNotice } from "../features/auth/AuthShell";
import Button from "../components/ui/Button";
import { TextField } from "../components/ui/Field";
import { getSupabase } from "../lib/supabase";

/**
 * Landing page for the password-recovery email link. Supabase puts a recovery
 * token in the URL; the client exchanges it for a session automatically
 * (detectSessionInUrl), after which updateUser({ password }) is allowed.
 */
export default function UpdatePassword() {
  const supabase = getSupabase();
  const navigate = useNavigate();
  const [ready, setReady] = useState<boolean | null>(null); // null = checking
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    // the recovery link may still be exchanging its token when we mount,
    // so listen for the session instead of checking once
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    // if nothing arrives, the link is missing/expired
    const t = window.setTimeout(() => setReady((r) => (r === null ? false : r)), 2500);
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
      window.clearTimeout(t);
    };
  }, [supabase]);

  if (!supabase) {
    return (
      <AuthShell kicker="Recovery" heading="Auth is not configured yet.">
        <p className="text-sm text-silver-400">
          Set the Supabase env vars in <code className="font-mono text-xs">.env</code> first.
        </p>
      </AuthShell>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) setError(err.message);
    else {
      setDone(true);
      window.setTimeout(() => navigate("/auth"), 2200);
    }
  };

  return (
    <AuthShell
      kicker="Recovery"
      heading="Set a new password."
      sub="You arrived here from a secure recovery link. Choose the new password for your account."
    >
      {done ? (
        <AuthNotice tone="ok">Password updated. Taking you to sign in…</AuthNotice>
      ) : ready === false ? (
        <>
          <AuthNotice tone="err">
            This recovery link is missing or has expired. Request a fresh one and try again.
          </AuthNotice>
          <p className="mt-6 text-center text-sm text-silver-400">
            <Link to="/auth/reset" className="text-volt-tint underline-offset-4 hover:underline">
              Request a new link →
            </Link>
          </p>
        </>
      ) : ready === null ? (
        <p className="font-mono text-[11px] tracking-[0.14em] text-silver-600">
          VERIFYING RECOVERY LINK…
        </p>
      ) : (
        <>
          <form onSubmit={(e) => void onSubmit(e)} className="space-y-5">
            <TextField
              label="New password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
            <TextField
              label="Confirm password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat it exactly"
              minLength={8}
              required
            />
            <Button variant="primary" className="w-full" disabled={busy}>
              {busy ? "Updating…" : "Update password"}
            </Button>
          </form>
          {error && <AuthNotice tone="err">{error}</AuthNotice>}
        </>
      )}
    </AuthShell>
  );
}

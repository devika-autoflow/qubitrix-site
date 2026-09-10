import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthShell, { AuthNotice } from "../features/auth/AuthShell";
import Button from "../components/ui/Button";
import { TextField } from "../components/ui/Field";
import { getSupabase } from "../lib/supabase";

/** Public page: request a password-reset email (Supabase resetPasswordForEmail). */
export default function ResetPassword() {
  const supabase = getSupabase();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!email) return;

    setBusy(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      // the link in the email lands the user on our styled update page
      redirectTo: `${window.location.origin}/auth/update-password`,
    });
    setBusy(false);
    if (err) setError(err.message);
    else setSent(true);
  };

  if (!supabase) {
    return (
      <AuthShell kicker="Recovery" heading="Auth is not configured yet.">
        <p className="text-sm text-silver-400">
          Set the Supabase env vars in <code className="font-mono text-xs">.env</code> first.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      kicker="Recovery"
      heading="Reset your password."
      sub="Enter the email on your account — we'll send a secure link that brings you back here to set a new one."
    >
      {sent ? (
        <>
          <AuthNotice tone="ok">
            Recovery link sent. Check your inbox (and spam) — the link opens the
            set-new-password screen.
          </AuthNotice>
          <p className="mt-6 text-center text-sm text-silver-400">
            <Link to="/auth" className="text-volt-tint underline-offset-4 hover:underline">
              ← Back to sign in
            </Link>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={(e) => void onSubmit(e)} className="space-y-5">
            <TextField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
            <Button variant="primary" className="w-full" disabled={busy}>
              {busy ? "Sending…" : "Send recovery link"}
            </Button>
          </form>
          {error && <AuthNotice tone="err">{error}</AuthNotice>}
          <p className="mt-6 text-center text-sm text-silver-400">
            Remembered it?{" "}
            <Link to="/auth" className="text-volt-tint underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}

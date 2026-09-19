import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

/**
 * Live Supabase session for any component. Sessions persist in localStorage
 * (see lib/supabase.ts), so a returning visitor is still signed in — the
 * UI must greet them by name, never ask them to log in again.
 *
 * The supabase client is imported dynamically: Nav uses this hook on every
 * page, and loading ~130 kB of auth SDK before first paint is not worth a
 * greeting that only signed-in visitors ever see.
 */
export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    void (async () => {
      const { getSupabase } = await import("./supabase");
      const supabase = getSupabase();
      if (!supabase || cancelled) return;
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(data.session);
      const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
      unsubscribe = () => sub.subscription.unsubscribe();
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return session;
}

/** Short display name: metadata full name → email local part → "there". */
export function displayName(session: Session | null): string {
  if (!session) return "";
  const meta = session.user.user_metadata as Record<string, unknown>;
  const raw =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    session.user.email?.split("@")[0] ||
    "there";
  // first word only, capitalized — nav space is tight
  const first = raw.trim().split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

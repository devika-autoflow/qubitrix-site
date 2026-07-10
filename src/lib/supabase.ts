import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase auth client. The anon key is designed to be public (RLS guards data),
 * so both values ship in the client bundle via VITE_ env vars.
 * Returns null when env is missing so auth pages can show a setup notice
 * instead of crashing the app.
 */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!url || !anonKey) return null;
  client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // reads the token out of the URL after OAuth / password-recovery redirects
      detectSessionInUrl: true,
    },
  });
  return client;
}

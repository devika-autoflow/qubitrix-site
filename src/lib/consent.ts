/**
 * Cookie / local-storage consent (GDPR + ePrivacy).
 *
 * Only two categories exist on this site today:
 *  - necessary  — always on, no consent needed: the Supabase auth token and the
 *                 per-tab sessionStorage id. Both are required for the site to
 *                 function and neither tracks across visits.
 *  - analytics  — the persistent `qx-user-id` in localStorage, which recognises
 *                 the same visitor across visits and is sent to the automation
 *                 webhook. That is non-essential, so it stays off until the
 *                 visitor opts in.
 *
 * The record itself is stored under a versioned key: bumping CONSENT_VERSION
 * re-prompts everyone, which is what a material policy change requires.
 */

export const CONSENT_VERSION = 1;
const KEY = "qx-consent";

export type ConsentChoice = "accepted" | "rejected";

export interface ConsentRecord {
  version: number;
  analytics: boolean;
  decidedAt: string;
}

type Listener = (record: ConsentRecord | null) => void;
const listeners = new Set<Listener>();

/** The stored decision, or null when the visitor has not decided yet. */
export function getConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    // a stale version is treated as "not decided" — the banner returns
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasDecided(): boolean {
  return getConsent() !== null;
}

/** True only on an explicit opt-in — the default is always "no". */
export function analyticsAllowed(): boolean {
  return getConsent()?.analytics === true;
}

export function setConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    analytics: choice === "accepted",
    decidedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(record));
  } catch {
    /* storage blocked — the in-memory notification below still applies */
  }
  // Withdrawal must actually erase what was collected under the old consent.
  if (!record.analytics) {
    try {
      localStorage.removeItem("qx-user-id");
    } catch {
      /* nothing to clear */
    }
  }
  listeners.forEach((fn) => fn(record));
  return record;
}

/** Clears the decision so the banner reappears (the "Cookie preferences" link). */
export function resetConsent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn(null));
}

export function onConsentChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

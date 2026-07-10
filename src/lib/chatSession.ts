/**
 * Visitor + session identity for the chat console webhook.
 *
 * - userId    — persistent per browser (localStorage): same person across visits.
 * - sessionId — per tab session (sessionStorage): survives refresh, new on new tab/visit.
 * - chatId    — per conversation: minted fresh each time the console opens.
 * - wasRefreshed / isNewSession — lets the webhook tell "continued after refresh"
 *   apart from "brand-new chat".
 */

const uuid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

function persistent(storage: Storage, key: string): { id: string; isNew: boolean } {
  try {
    const existing = storage.getItem(key);
    if (existing) return { id: existing, isNew: false };
    const id = uuid();
    storage.setItem(key, id);
    return { id, isNew: true };
  } catch {
    // storage blocked (private mode) — fall back to an in-memory id
    return { id: uuid(), isNew: true };
  }
}

export function newChatId(): string {
  return uuid();
}

export interface ChatIdentity {
  userId: string;
  sessionId: string;
  isNewUser: boolean;
  isNewSession: boolean;
  wasRefreshed: boolean;
}

export function getChatIdentity(): ChatIdentity {
  const user = persistent(localStorage, "qx-user-id");
  const session = persistent(sessionStorage, "qx-session-id");

  let wasRefreshed = false;
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    wasRefreshed = nav?.type === "reload";
  } catch {
    /* older browsers: leave false */
  }

  return {
    userId: user.id,
    sessionId: session.id,
    isNewUser: user.isNew,
    isNewSession: session.isNew,
    wasRefreshed,
  };
}

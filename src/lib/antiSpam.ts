/**
 * Bot defence for the public forms.
 *
 * The webhook URLs ship in the client bundle, so they can be posted to directly.
 * These checks cost a real visitor nothing and stop the crude scripted floods:
 *
 *  - honeypot: a field hidden from people but filled in by naive form-fillers.
 *  - dwell time: a human takes more than a couple of seconds to write a message.
 *
 * Neither is a substitute for validating on the n8n side — treat both as a
 * first filter, and add a CAPTCHA only if real spam gets through.
 */

/** Name of the honeypot input. Plausible enough that bots want to fill it. */
export const HONEYPOT_FIELD = "company_website";

/** Minimum time on the form before a submission is believable. */
const MIN_DWELL_MS = 2500;

export interface SpamVerdict {
  isSpam: boolean;
  reason?: "honeypot" | "too-fast";
}

export function checkSubmission(
  data: Record<string, string>,
  mountedAt: number
): SpamVerdict {
  if (data[HONEYPOT_FIELD]?.trim()) return { isSpam: true, reason: "honeypot" };
  if (Date.now() - mountedAt < MIN_DWELL_MS) return { isSpam: true, reason: "too-fast" };
  return { isSpam: false };
}

/** Strip the honeypot before the payload goes anywhere. */
export function withoutHoneypot(data: Record<string, string>): Record<string, string> {
  const { [HONEYPOT_FIELD]: _ignored, ...rest } = data;
  return rest;
}

/** Inline styles that hide the field from people but not from bots. */
export const honeypotStyle: React.CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: 1,
  height: 1,
  opacity: 0,
  pointerEvents: "none",
};

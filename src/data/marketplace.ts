/**
 * Canonical marketplace copy and public figures.
 *
 * TODO(leighton): Confirm the exact homeowner guarantee terms. GUARANTEE_LINE
 * is the homeowner-facing wording. PRO_GUARANTEE_LINE is the pro-facing line.
 */

export const GUARANTEE_LINE =
  "If the work isn't done as agreed, we'll make it right.";

/** Shown under the pro how-it-works steps. */
export const PRO_GUARANTEE_LINE = 'Only pay for the jobs you win';

/**
 * Hours named in homeowner and contact confirmations.
 * TODO(leighton): confirm the real response window before this is a promise.
 */
export const PRO_CONTACT_WITHIN_HOURS = 24;

export function homeownerConfirmation(
  hours: number = PRO_CONTACT_WITHIN_HOURS,
): string {
  return `You're matched, a pro will contact you within ${hours} hours.`;
}

export function contactConfirmation(
  hours: number = PRO_CONTACT_WITHIN_HOURS,
): string {
  return `Message received. We'll reply within ${hours} hours.`;
}

export const PRO_APPLICATION_CONFIRMATION =
  "Application received. We'll review your license and insurance, then follow up about jobs in your trade and area.";

export const HOMEOWNER_REASSURANCE =
  'Free to post. No spam calls, and your details only go to the pro you’re matched with.';

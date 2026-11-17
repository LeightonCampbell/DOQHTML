import type { NotifyEnv } from './types';

export type { NotifyEnv, NotifyMessage } from './types';
export { sendTelegram } from './telegram';

function pick(runtime: Record<string, string | undefined>, key: string): string {
  const fromRuntime = runtime[key];
  if (typeof fromRuntime === 'string' && fromRuntime.trim()) return fromRuntime.trim();
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[key];
  if (typeof fromMeta === 'string' && fromMeta.trim()) return fromMeta.trim();
  return '';
}

/** Read notification settings from the Cloudflare runtime or local env. Never hard-code secrets. */
export function readNotifyEnv(locals: { runtime?: { env?: Record<string, string> } } | undefined): NotifyEnv {
  const runtime = locals?.runtime?.env ?? {};
  return {
    RESEND_API_KEY: pick(runtime, 'RESEND_API_KEY'),
    RESEND_FROM: pick(runtime, 'RESEND_FROM') || pick(runtime, 'FROM_EMAIL'),
    NOTIFY_EMAIL_TO: pick(runtime, 'NOTIFY_EMAIL_TO') || pick(runtime, 'NOTIFICATION_EMAIL'),
    TELEGRAM_BOT_TOKEN: pick(runtime, 'TELEGRAM_BOT_TOKEN'),
    TELEGRAM_CHAT_ID: pick(runtime, 'TELEGRAM_CHAT_ID'),
    NOTIFY_DRY_RUN: pick(runtime, 'NOTIFY_DRY_RUN'),
  };
}

export function isDryRun(env: NotifyEnv): boolean {
  const flag = env.NOTIFY_DRY_RUN.toLowerCase();
  return flag === '1' || flag === 'true' || flag === 'yes' || env.RESEND_API_KEY === 'test';
}

/** Names of the Resend settings that are still empty after the documented fallbacks. */
export function missingResendNames(env: NotifyEnv): string[] {
  const missing: string[] = [];
  if (!env.RESEND_API_KEY) missing.push('RESEND_API_KEY');
  if (!env.RESEND_FROM) missing.push('RESEND_FROM');
  if (!env.NOTIFY_EMAIL_TO) missing.push('NOTIFY_EMAIL_TO');
  return missing;
}

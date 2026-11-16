import { DiscordNotifier } from './discord';
import { TelegramNotifier } from './telegram';
import type { Notifier, NotifyEnv } from './types';

export type { Notifier, NotifyEnv, NotifyMessage } from './types';

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
    DISCORD_WEBHOOK_URL: pick(runtime, 'DISCORD_WEBHOOK_URL'),
    NOTIFY_CHANNEL: (pick(runtime, 'NOTIFY_CHANNEL') || 'discord').toLowerCase(),
    TELEGRAM_BOT_TOKEN: pick(runtime, 'TELEGRAM_BOT_TOKEN'),
    TELEGRAM_CHAT_ID: pick(runtime, 'TELEGRAM_CHAT_ID'),
    NOTIFY_DRY_RUN: pick(runtime, 'NOTIFY_DRY_RUN'),
  };
}

export function isDryRun(env: NotifyEnv): boolean {
  const flag = env.NOTIFY_DRY_RUN.toLowerCase();
  return flag === '1' || flag === 'true' || flag === 'yes' || env.RESEND_API_KEY === 'test';
}

/** Discord by default. Set NOTIFY_CHANNEL=telegram to switch senders. */
export function createNotifier(env: NotifyEnv): Notifier {
  if (env.NOTIFY_CHANNEL === 'telegram') {
    return new TelegramNotifier(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID);
  }
  if (env.NOTIFY_CHANNEL !== 'discord') {
    throw new Error(`Unknown NOTIFY_CHANNEL "${env.NOTIFY_CHANNEL}". Use discord or telegram.`);
  }
  return new DiscordNotifier(env.DISCORD_WEBHOOK_URL);
}

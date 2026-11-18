import type { NotifyEnv, NotifyMessage } from './types';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Secondary chat ping. Throws when the bot settings are missing or Telegram rejects the message. */
export async function sendTelegram(env: NotifyEnv, message: NotifyMessage): Promise<void> {
  const missing: string[] = [];
  if (!env.TELEGRAM_BOT_TOKEN) missing.push('TELEGRAM_BOT_TOKEN');
  if (!env.TELEGRAM_CHAT_ID) missing.push('TELEGRAM_CHAT_ID');
  if (missing.length) {
    throw new Error(`Missing ${missing.join(', ')}`);
  }

  const text = `<b>${escapeHtml(message.title)}</b>\n\n${escapeHtml(message.body)}`.slice(0, 4000);
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  if (!response.ok) {
    const body = (await response.text()).slice(0, 500);
    throw new Error(`status=${response.status} body=${body}`);
  }
}

import type { Notifier, NotifyMessage } from './types';

/**
 * Telegram sender. Select it by setting NOTIFY_CHANNEL=telegram
 * plus TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. No other code change is required.
 */
export class TelegramNotifier implements Notifier {
  readonly channel = 'telegram' as const;

  constructor(
    private readonly botToken: string,
    private readonly chatId: string,
  ) {}

  async send(message: NotifyMessage): Promise<void> {
    if (!this.botToken || !this.chatId) {
      throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required when NOTIFY_CHANNEL=telegram.');
    }
    const text = `${message.title}\n\n${message.body}`.slice(0, 4000);
    const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: this.chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!response.ok) {
      throw new Error(`Telegram send failed (${response.status}).`);
    }
  }
}

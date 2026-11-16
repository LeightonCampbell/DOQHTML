import type { Notifier, NotifyMessage } from './types';

export class DiscordNotifier implements Notifier {
  readonly channel = 'discord' as const;

  constructor(private readonly webhookUrl: string) {}

  async send(message: NotifyMessage): Promise<void> {
    if (!this.webhookUrl) {
      throw new Error('DISCORD_WEBHOOK_URL is not set.');
    }
    const content = trimNotify(`${message.title}\n\n${message.body}`);
    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`Discord webhook failed (${response.status}).`);
    }
  }
}

function trimNotify(text: string): string {
  return text.length > 1900 ? `${text.slice(0, 1890)}…` : text;
}

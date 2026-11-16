export type NotifyMessage = {
  title: string;
  body: string;
};

/** A channel that receives a plain-text notification. Discord today; Telegram is the other implementation. */
export interface Notifier {
  readonly channel: 'discord' | 'telegram';
  send(message: NotifyMessage): Promise<void>;
}

export type NotifyEnv = {
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  NOTIFY_EMAIL_TO: string;
  DISCORD_WEBHOOK_URL: string;
  NOTIFY_CHANNEL: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  NOTIFY_DRY_RUN: string;
};

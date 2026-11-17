export type NotifyMessage = {
  title: string;
  body: string;
};

export type NotifyEnv = {
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  NOTIFY_EMAIL_TO: string;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  NOTIFY_DRY_RUN: string;
};

# DOQHTML – Deals of Quality Static Site

Static HTML/CSS site for [Deals of Quality](https://www.dealsofquality.com), built with **Astro** and **Tailwind CSS**. The build outputs 100% vanilla HTML/CSS (no client-side JS frameworks). A minimal script is included only for the mobile menu toggle.

## Tech Stack

- **Astro** – Static site generator
- **Tailwind CSS** – Styling
- **Output:** Static HTML with trailing-slash URLs (`/`, `/services/tv-mounting-los-angeles/`)

## Project Structure

```
src/
├── components/
│   ├── Head.astro      # SEO meta: title, description, canonical (props)
│   ├── Navbar.astro    # Site header + mobile menu
│   └── Footer.astro    # Newsletter, CTA, legal links
├── layouts/
│   └── BaseLayout.astro  # Wraps Head, Navbar, slot, Footer
├── pages/
│   ├── index.astro     # Homepage
│   └── services/
│       └── tv-mounting-los-angeles/
│           └── index.astro  # Service page → /services/tv-mounting-los-angeles/
└── styles/
    └── global.css      # Tailwind import
```

## SEO & Routing

- **Head component:** Every page passes `title`, `description`, and `canonical` (full URL). One set of meta tags per page.
- **Folder-based routing:** `src/pages/services/tv-mounting-los-angeles/index.astro` → `dist/services/tv-mounting-los-angeles/index.html` (trailing-slash structure for SEO parity).

## Form notifications

Every lead form posts to a Pages function that calls `handleSubmission` in `src/lib/submissions.ts`. Resend email is required. Telegram is a second ping and does not block the confirmation if it is not configured.

Set these on the Cloudflare Pages project `doqhtml`, for both Production and Preview. Do not commit values.

| Name | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, secret | Resend API key |
| `RESEND_FROM` | Yes | Verified sender. `FROM_EMAIL` is used when this is empty |
| `NOTIFY_EMAIL_TO` | Yes | Inbox that receives every submission. `NOTIFICATION_EMAIL` is used when this is empty |
| `TELEGRAM_BOT_TOKEN` | Secret, for the chat ping | Bot token from BotFather |
| `TELEGRAM_CHAT_ID` | For the chat ping | Chat that receives the message |

If `RESEND_API_KEY`, `RESEND_FROM`, or `NOTIFY_EMAIL_TO` is missing, or the email to `NOTIFY_EMAIL_TO` fails, the function logs the missing names or Resend's error name and message and returns an error. The form shows that error instead of the success screen. The customer confirmation email and the Telegram ping are sent after that. If either fails, it is logged with the Resend message id and the form still succeeds, because the owner email already has the lead.

`NOTIFY_DRY_RUN=1` skips both sends. Use it only for local checks.

## Commands

| Command        | Action           |
|----------------|------------------|
| `npm run dev`  | Start dev server |
| `npm run build`| Build to `dist/` |
| `npm run preview` | Preview production build |

## Adding a New Page

1. Add a file under `src/pages/` (e.g. `src/pages/services/handyman-los-angeles/index.astro`).
2. Use `BaseLayout` with explicit `title`, `description`, and `canonical`.
3. Build; output will be at `/services/handyman-los-angeles/index.html`.

## Logo assets

Header logos are in `public/images/logo-light.png` and `logo-dark.png`. If you see a visible background around the logo, the PNGs have an opaque background baked in. For a clean look, export **transparent-background** versions from your design tool and replace these files. The nav currently uses a matching wrapper background (black over hero, white when scrolled) so non-transparent logos blend in.

## Editing Global UI

- **Navbar:** `src/components/Navbar.astro`
- **Footer:** `src/components/Footer.astro`
- **Default meta / favicon:** `src/components/Head.astro`

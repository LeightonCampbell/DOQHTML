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

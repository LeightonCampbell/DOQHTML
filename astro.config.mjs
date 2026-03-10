// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://www.dealsofquality.com';

/** Utility/post-conversion pages to exclude from the sitemap */
const SITEMAP_EXCLUDE = ['/success/', '/quote-received/', '/booking-confirmed/', '/tracker/'];

/** Build custom sitemap URLs for SSR/dynamic routes (blog articles + TV mounting city pages). */
function getCustomSitemapPages() {
  const customPages = [];

  // Article URLs: /articles/[slug]/ (content lives in src/content/blog/*.md)
  try {
    const blogDir = join(__dirname, 'src', 'content', 'blog');
    const files = readdirSync(blogDir);
    const slugs = files
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
    slugs.forEach((slug) => customPages.push(`${SITE}/articles/${slug}/`));
  } catch (_) {
    // ignore if dir missing at config load time
  }

  // TV mounting city pages: /services/tv-mounting-[city]/
  try {
    const citiesPath = join(__dirname, 'src', 'data', 'tvMountingCities.ts');
    const content = readFileSync(citiesPath, 'utf-8');
    const slugMatches = content.matchAll(/\{\s*slug:\s*["']([^"']+)["']/g);
    for (const m of slugMatches) {
      customPages.push(`${SITE}/services/tv-mounting-${m[1]}/`);
    }
  } catch (_) {
    // fallback: hardcode known city slugs if file read fails
    const fallbackSlugs = [
      'beverly-hills', 'brentwood', 'burbank', 'culver-city', 'encino',
      'glendale', 'hollywood', 'los-angeles', 'malibu', 'manhattan-beach',
      'marina-del-rey', 'pacific-palisades', 'pasadena', 'santa-monica',
      'sherman-oaks', 'silver-lake', 'studio-city',
    ];
    fallbackSlugs.forEach((slug) => customPages.push(`${SITE}/services/tv-mounting-${slug}/`));
  }

  return customPages;
}

// Legacy /services/ tech URLs → /tech-support/ (301 permanent)
const LEGACY_REDIRECTS = {
  '/services/computer-repair/': '/tech-support/computer-repair/',
  '/services/virus-removal/': '/tech-support/virus-removal/',
  '/services/printer-setup/': '/tech-support/printer-setup/',
  '/services/data-backup/': '/tech-support/data-backup-recovery/',
};

/** Build /blog/[slug]/ → /articles/[slug]/ redirects (301 permanent) */
function getBlogRedirects() {
  const redirects = {};
  try {
    const blogDir = join(__dirname, 'src', 'content', 'blog');
    const files = readdirSync(blogDir);
    const slugs = files
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
    slugs.forEach((slug) => {
      redirects[`/blog/${slug}/`] = { status: 301, destination: `/articles/${slug}/` };
    });
  } catch (_) {
    // ignore if dir missing at config load time
  }
  return redirects;
}

const BLOG_REDIRECTS = getBlogRedirects();

// Redirect old blog index to articles index
BLOG_REDIRECTS['/blog/'] = { status: 301, destination: '/articles/' };

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: cloudflare(),
  trailingSlash: 'always',
  redirects: {
    ...Object.fromEntries(
      Object.entries(LEGACY_REDIRECTS).map(([from, to]) => [
        from,
        { status: 301, destination: to },
      ])
    ),
    ...BLOG_REDIRECTS,
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (url) => {
        const excluded = SITEMAP_EXCLUDE.some((path) => url.includes(path));
        return !excluded;
      },
      customPages: getCustomSitemapPages(),
    }),
  ],
});

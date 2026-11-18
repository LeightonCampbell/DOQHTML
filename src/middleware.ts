import { defineMiddleware } from 'astro:middleware';
import { httpsRedirectTarget } from './lib/https-redirect';

/**
 * Send plain http requests to https when they reach the app.
 * Local dev stays on http. If http:// still returns 500 before this runs,
 * turn on Always Use HTTPS for the dealsofquality.com zone in Cloudflare.
 */
export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const hostHeader = context.request.headers.get('x-forwarded-host') || context.request.headers.get('host') || url.host;
  const target = httpsRedirectTarget({
    protocol: url.protocol,
    host: hostHeader,
    pathname: url.pathname,
    search: url.search,
    forwardedProto: context.request.headers.get('x-forwarded-proto'),
  });
  if (target) return context.redirect(target, 301);
  return next();
});

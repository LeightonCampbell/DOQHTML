/** Decide whether an inbound request should be redirected to https. */
export function httpsRedirectTarget(input: {
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  forwardedProto: string | null;
}): string | null {
  const host = input.host.split(',')[0].trim();
  const isLocal =
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('[::1]');
  if (isLocal) return null;
  const forwarded = (input.forwardedProto || '').split(',')[0].trim().toLowerCase();
  const clientUsedHttp = forwarded === 'http' || (forwarded === '' && input.protocol === 'http:');
  if (!clientUsedHttp) return null;
  return `https://${host}${input.pathname}${input.search}`;
}

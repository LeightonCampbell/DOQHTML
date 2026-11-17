import {
  contactConfirmation,
  homeownerConfirmation,
  proApplicationConfirmation,
} from '../data/marketplace';
import { createNotifier, isDryRun, readNotifyEnv } from './notify';

export type SubmissionKind = 'project' | 'pro' | 'contact';

const USER_ERROR =
  "We couldn't send that just now. Please try again, or call (818) 584-7389.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HONEYPOT_FIELDS = ['company_website', 'website_url', '_gotcha'];

type Fields = Record<string, string>;

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export function methodNotAllowed(): Response {
  return json(
    { success: false, error: 'Submit the form to continue. This address does not show a confirmation on its own.' },
    405,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value: unknown, max = 500): string {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function digits(value: string): string {
  return value.replace(/\D/g, '');
}

async function readFields(request: Request): Promise<Fields> {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    if (!body || typeof body !== 'object') return {};
    const fields: Fields = {};
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
      if (typeof value === 'boolean') fields[key] = value ? 'yes' : '';
      else if (value == null) fields[key] = '';
      else fields[key] = String(value);
    }
    return fields;
  }
  const form = await request.formData();
  const fields: Fields = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') fields[key] = value;
  }
  return fields;
}

function honeypotTripped(fields: Fields): boolean {
  return HONEYPOT_FIELDS.some((name) => clean(fields[name], 200).length > 0);
}

function requireText(fields: Fields, key: string, label: string, min = 2, max = 120): string | null {
  const value = clean(fields[key], max);
  if (value.length < min) return `Enter ${label}.`;
  return null;
}

function requireEmail(fields: Fields): string | null {
  const email = clean(fields.email, 160).toLowerCase();
  if (!EMAIL_RE.test(email)) return 'Enter a valid email address.';
  return null;
}

function requirePhone(fields: Fields): string | null {
  const phone = clean(fields.phone, 40);
  if (digits(phone).length < 7) return 'Enter a phone number we can reach you at.';
  return null;
}

function requireZip(fields: Fields): string | null {
  const zip = digits(clean(fields.zip, 12)).slice(0, 5);
  if (zip.length !== 5) return 'Enter a 5-digit ZIP code.';
  const zipNum = Number(zip);
  if (zipNum < 501 || zipNum > 99950) return 'Enter a valid US ZIP code.';
  return null;
}

type Prepared = {
  subject: string;
  ownerHtml: string;
  visitorEmail: string;
  visitorSubject: string;
  visitorHtml: string;
  notifyTitle: string;
  notifyBody: string;
};

function row(label: string, value: string): string {
  return `<p style="margin:0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || '—')}</p>`;
}

function prepare(kind: SubmissionKind, fields: Fields): { ok: true; prepared: Prepared } | { ok: false; error: string } {
  const emailError = requireEmail(fields);
  if (emailError) return { ok: false, error: emailError };

  if (kind === 'project') {
    const nameError = requireText(fields, 'name', 'your name');
    if (nameError) return { ok: false, error: nameError };
    const phoneError = requirePhone(fields);
    if (phoneError) return { ok: false, error: phoneError };
    const service = clean(fields.service || fields.serviceOther, 160);
    if (service.length < 2) return { ok: false, error: 'Tell us what you need done.' };
    const zipError = requireZip(fields);
    if (zipError) return { ok: false, error: zipError };
    const name = clean(fields.name, 80);
    const email = clean(fields.email, 160).toLowerCase();
    const phone = clean(fields.phone, 40);
    const zip = digits(fields.zip).slice(0, 5);
    const timing = clean(fields.preferredTiming || fields.urgency || fields.timing, 80);
    const details = clean(fields.details || fields.message, 2000);
    const lines = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone],
      ['Project', service],
      ['ZIP', zip],
      ['Timing', timing || 'Not specified'],
      ['Details', details || 'None'],
    ] as const;
    const confirmation = homeownerConfirmation();
    return {
      ok: true,
      prepared: {
        subject: `New project — ${service} — ${zip}`,
        ownerHtml: `<h1>New homeowner project</h1>${lines.map(([l, v]) => row(l, v)).join('')}`,
        visitorEmail: email,
        visitorSubject: 'Your project is posted — Deals of Quality',
        visitorHtml: `<p>Hi ${escapeHtml(name.split(' ')[0] || 'there')},</p><p>${escapeHtml(confirmation)}</p><p>You only pay for the work. Call (818) 584-7389 if you need to add a detail.</p>`,
        notifyTitle: 'New homeowner project',
        notifyBody: lines.map(([l, v]) => `${l}: ${v}`).join('\n'),
      },
    };
  }

  if (kind === 'pro') {
    const first = clean(fields.firstName, 60);
    const last = clean(fields.lastName, 60);
    if (first.length < 1 || last.length < 1) return { ok: false, error: 'Enter your first and last name.' };
    const phoneError = requirePhone(fields);
    if (phoneError) return { ok: false, error: phoneError };
    const business = clean(fields.businessName, 120);
    if (business.length < 2) return { ok: false, error: 'Enter your business name.' };
    const service = clean(fields.primaryServiceOther || fields.primaryService, 160);
    if (service.length < 2) return { ok: false, error: 'Choose the service you offer.' };
    const zipError = requireZip(fields);
    if (zipError) return { ok: false, error: zipError };
    const email = clean(fields.email, 160).toLowerCase();
    const phone = clean(fields.phone, 40);
    const zip = digits(fields.zip).slice(0, 5);
    const insured = clean(fields.hasLiabilityInsurance, 8).toLowerCase();
    const hasInsurance = insured === 'yes' || insured === 'true' || insured === 'on';
    const lines = [
      ['Name', `${first} ${last}`],
      ['Email', email],
      ['Phone', phone],
      ['Business', business],
      ['Trade', service],
      ['ZIP', zip],
      ['Liability insurance', hasInsurance ? 'Yes' : 'Not confirmed'],
    ] as const;
    return {
      ok: true,
      prepared: {
        subject: `New pro application — ${business}`,
        ownerHtml: `<h1>New pro application</h1>${lines.map(([l, v]) => row(l, v)).join('')}`,
        visitorEmail: email,
        visitorSubject: 'We received your application — Deals of Quality',
        visitorHtml: `<p>Hi ${escapeHtml(first)},</p><p>${escapeHtml(proApplicationConfirmation())}</p>`,
        notifyTitle: 'New pro application',
        notifyBody: lines.map(([l, v]) => `${l}: ${v}`).join('\n'),
      },
    };
  }

  const nameError = requireText(fields, 'name', 'your name');
  if (nameError) return { ok: false, error: nameError };
  const message = clean(fields.message, 4000);
  if (message.length < 10) return { ok: false, error: 'Tell us a bit more in your message.' };
  const name = clean(fields.name, 80);
  const email = clean(fields.email, 160).toLowerCase();
  const phone = clean(fields.phone, 40);
  const lines = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || 'Not provided'],
    ['Message', message],
  ] as const;
  return {
    ok: true,
    prepared: {
      subject: `New message — ${name}`,
      ownerHtml: `<h1>New contact message</h1>${lines.map(([l, v]) => row(l, v)).join('')}`,
      visitorEmail: email,
      visitorSubject: 'We received your message — Deals of Quality',
      visitorHtml: `<p>Hi ${escapeHtml(name.split(' ')[0] || 'there')},</p><p>${escapeHtml(contactConfirmation())}</p><p>Call (818) 584-7389 if you would rather talk it through.</p>`,
      notifyTitle: 'New contact message',
      notifyBody: lines.map(([l, v]) => `${l}: ${v}`).join('\n'),
    },
  };
}

async function sendResend(apiKey: string, payload: Record<string, unknown>): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Resend failed (${response.status}).`);
  }
}

export async function handleSubmission(
  kind: SubmissionKind,
  request: Request,
  locals: { runtime?: { env?: Record<string, string> } } | undefined,
): Promise<Response> {
  let fields: Fields;
  try {
    fields = await readFields(request);
  } catch {
    return json({ success: false, error: 'We could not read that submission. Please try again.' }, 400);
  }

  if (honeypotTripped(fields)) {
    return json({ success: true }, 200);
  }

  const result = prepare(kind, fields);
  if (!result.ok) return json({ success: false, error: result.error }, 400);

  const env = readNotifyEnv(locals);
  if (isDryRun(env)) {
    console.info(`[submission] dry run accepted ${kind}`);
    return json({ success: true, dryRun: true }, 200);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM || !env.NOTIFY_EMAIL_TO) {
    console.error('[submission] Missing RESEND_API_KEY, RESEND_FROM, or NOTIFY_EMAIL_TO');
    return json({ success: false, error: USER_ERROR }, 500);
  }

  const { prepared } = result;
  try {
    await sendResend(env.RESEND_API_KEY, {
      from: env.RESEND_FROM,
      to: env.NOTIFY_EMAIL_TO,
      reply_to: prepared.visitorEmail,
      subject: prepared.subject,
      html: `<div style="font-family:sans-serif;line-height:1.5">${prepared.ownerHtml}</div>`,
    });
    await sendResend(env.RESEND_API_KEY, {
      from: env.RESEND_FROM,
      to: prepared.visitorEmail,
      subject: prepared.visitorSubject,
      html: `<div style="font-family:sans-serif;line-height:1.5">${prepared.visitorHtml}</div>`,
    });
  } catch (error) {
    console.error('[submission] email failed', error);
    return json({ success: false, error: USER_ERROR }, 502);
  }

  try {
    const notifier = createNotifier(env);
    await notifier.send({ title: prepared.notifyTitle, body: prepared.notifyBody });
  } catch (error) {
    console.error('[submission] notification failed', error);
  }

  return json({ success: true }, 200);
}

/**
 * API endpoint: POST /api/send-email
 * Sends email notifications via Resend for Quote and Booking form submissions.
 * Expects JSON: { formType, name, email, phone?, service?, serviceOther?, zip?, urgency?, details?, category?, preferredTiming? }
 */
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL = import.meta.env.NOTIFICATION_EMAIL || 'notifications@dealsofquality.com';
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'onboarding@resend.dev';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('content-type')?.includes('application/json') === false) {
    return new Response(
      JSON.stringify({ error: 'Content-Type must be application/json' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return new Response(
      JSON.stringify({ error: 'Email service is not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const formType = typeof body.formType === 'string' ? body.formType : 'quote';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const service = typeof body.service === 'string' ? body.service.trim() : '';
  const serviceOther = typeof body.serviceOther === 'string' ? body.serviceOther.trim() : '';
  const zip = typeof body.zip === 'string' ? body.zip.trim() : '';
  const urgency = typeof body.urgency === 'string' ? body.urgency : '';
  const details = typeof body.details === 'string' ? body.details.trim() : '';
  const category = typeof body.category === 'string' ? body.category.trim() : '';
  const preferredTiming = typeof body.preferredTiming === 'string' ? body.preferredTiming : '';

  if (!name || !email) {
    return new Response(
      JSON.stringify({ error: 'Name and email are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  const subject =
    formType === 'booking'
      ? `Booking request from ${name}`
      : `Quote request from ${name}`;

  const serviceDisplay = service || serviceOther || category || 'Not specified';
  const timingDisplay = formType === 'booking' ? preferredTiming : urgency;

  const html = `
    <h2>${formType === 'booking' ? 'Booking' : 'Quote'} request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Service requested:</strong> ${escapeHtml(serviceDisplay)}</p>
    ${zip ? `<p><strong>ZIP:</strong> ${escapeHtml(zip)}</p>` : ''}
    ${timingDisplay ? `<p><strong>When:</strong> ${escapeHtml(timingDisplay)}</p>` : ''}
    ${details ? `<p><strong>Details:</strong><br/>${escapeHtml(details).replace(/\n/g, '<br/>')}</p>` : ''}
  `;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFICATION_EMAIL],
    subject,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, id: data?.id }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}

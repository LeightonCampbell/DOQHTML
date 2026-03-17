export const prerender = false;

import { Resend } from 'resend';

interface ProApplicationData {
  primaryService: string;
  primaryServiceOther: string;
  zip: string;
  businessName: string;
  hasLiabilityInsurance: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function extractProData(form: FormData): ProApplicationData {
  const get = (name: string) => (form.get(name) ?? '').toString().trim();

  return {
    primaryService: get('primaryService'),
    primaryServiceOther: get('primaryServiceOther'),
    zip: get('zip'),
    businessName: get('businessName'),
    hasLiabilityInsurance: form.get('hasLiabilityInsurance') != null,
    firstName: get('firstName'),
    lastName: get('lastName'),
    email: get('email'),
    phone: get('phone'),
  };
}

function buildOwnerHtml(data: ProApplicationData) {
  const safe = (value: string | boolean) =>
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : (value || 'N/A');

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>New Pro Application</title>
      <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background:#f3f4f6; margin:0; padding:24px; }
        .card { max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 35px rgba(15,23,42,0.18); }
        .header { background:#111827; color:#f9fafb; padding:20px 24px; }
        .header h1 { margin:0; font-size:20px; }
        .section { padding:20px 24px; border-top:1px solid #e5e7eb; }
        .section:first-of-type { border-top:none; }
        .section h2 { margin:0 0 10px; font-size:14px; text-transform:uppercase; letter-spacing:0.12em; color:#6b7280; }
        .field { margin-bottom:8px; font-size:14px; }
        .field span { font-weight:600; color:#374151; display:inline-block; min-width:160px; }
        .field strong { font-weight:500; color:#111827; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>New Pro Application</h1>
        </div>
        <div class="section">
          <h2>Service Details</h2>
          <div class="field"><span>Primary service:</span> <strong>${safe(data.primaryService)}</strong></div>
          <div class="field"><span>Service (typed):</span> <strong>${safe(data.primaryServiceOther)}</strong></div>
          <div class="field"><span>ZIP code:</span> <strong>${safe(data.zip)}</strong></div>
        </div>
        <div class="section">
          <h2>Business Details</h2>
          <div class="field"><span>Business name:</span> <strong>${safe(data.businessName)}</strong></div>
          <div class="field"><span>Liability insurance:</span> <strong>${data.hasLiabilityInsurance ? 'Yes' : 'No'}</strong></div>
        </div>
        <div class="section">
          <h2>Contact</h2>
          <div class="field"><span>Name:</span> <strong>${safe(data.firstName)} ${safe(data.lastName)}</strong></div>
          <div class="field"><span>Email:</span> <strong>${safe(data.email)}</strong></div>
          <div class="field"><span>Phone:</span> <strong>${safe(data.phone)}</strong></div>
        </div>
      </div>
    </body>
  </html>`;
}

function buildProHtml(data: ProApplicationData) {
  const firstName = data.firstName || 'there';
  const service =
    data.primaryServiceOther ||
    data.primaryService ||
    'your services';

  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Thanks for applying</title>
      <style>
        body { margin:0; padding:0; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#e5e7eb; }
        .wrapper { padding:32px 16px; }
        .card { max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; box-shadow:0 8px 30px rgba(15,23,42,0.15); overflow:hidden; }
        .header { background:#111827; color:#f9fafb; padding:22px 28px; text-align:left; }
        .header h1 { margin:0; font-size:20px; }
        .content { padding:26px 28px 28px; font-size:15px; color:#374151; line-height:1.6; }
        .content p { margin:0 0 14px; }
        .content p:last-of-type { margin-bottom:0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="card">
          <div class="header">
            <h1>We received your pro application</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thanks for applying to join Deals of Quality as a professional. We’ve received your details and will review your application shortly.</p>
            <p>Our team looks at service fit, service area (ZIP ${data.zip || 'N/A'}), and insurance status before moving a new pro forward. If everything looks good, we’ll reach out by phone or email to walk through how jobs are matched and what you can expect.</p>
            <p>If you have any questions in the meantime, just reply to this email.</p>
            <p>Best regards,<br />The Deals of Quality Team</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

export async function POST({ request, locals }: any) {
  try {
    const form = await request.formData();
    const data = extractProData(form);

    const apiKey =
      import.meta.env.RESEND_API_KEY || locals?.runtime?.env?.RESEND_API_KEY;
    const fromEmail =
      import.meta.env.FROM_EMAIL ||
      locals?.runtime?.env?.FROM_EMAIL ||
      'onboarding@resend.dev';
    const toEmail =
      import.meta.env.NOTIFICATION_EMAIL ||
      locals?.runtime?.env?.NOTIFICATION_EMAIL ||
      'notifications@dealsofquality.com';

    if (!apiKey) {
      console.error('[apply] Missing RESEND_API_KEY');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing email configuration.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (!data.email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const resend = new Resend(apiKey);

    // Email 1: to site admin/owner
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Pro Application — ${data.businessName || data.firstName || 'Unknown'}`,
      html: buildOwnerHtml(data),
    });

    // Email 2: confirmation to pro
    await resend.emails.send({
      from: fromEmail,
      to: data.email,
      subject: 'Thanks for applying to join Deals of Quality',
      html: buildProHtml(data),
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[apply] Server error', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}


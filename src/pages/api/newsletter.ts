export const prerender = false;

import { Resend } from 'resend';

export async function POST({ request, locals }: any) {
  try {
    const form = await request.formData();
    const email = (form.get('email') ?? '').toString().trim();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

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
      console.error('[newsletter] Missing RESEND_API_KEY');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing email configuration.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const resend = new Resend(apiKey);

    // Notify site owner of new subscriber
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'New newsletter subscriber',
      html: `<p>A new subscriber joined the newsletter:</p><p><strong>${email}</strong></p>`,
    });

    // Simple confirmation to subscriber
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Thanks for subscribing to Deals of Quality tips',
      html: `<!DOCTYPE html>
        <html>
          <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#f9fafb; margin:0; padding:24px;">
            <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px 28px;box-shadow:0 10px 30px rgba(15,23,42,0.12);">
              <h1 style="margin-top:0;font-size:20px;color:#111827;">You’re subscribed 🎉</h1>
              <p style="font-size:15px;color:#374151;line-height:1.6;">
                Thanks for subscribing to Deals of Quality. We’ll send occasional tips, service updates,
                and exclusive offers straight to your inbox.
              </p>
              <p style="font-size:15px;color:#374151;line-height:1.6;margin-bottom:0;">
                If you ever want to stop receiving these emails, you can unsubscribe from any message.
              </p>
            </div>
          </body>
        </html>`,
    });

    // Redirect to success page to keep UX same as before
    return Response.redirect('https://www.dealsofquality.com/success/', 302);
  } catch (error) {
    console.error('[newsletter] Server error', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}


export const prerender = false;

// 1. Template for YOU (The Business Owner)
function generateOwnerHTML(data: any) {
  const brandColor = "#f97316";
  const isBooking = data.formType === 'booking';
  const title = isBooking ? "New Booking Request" : "New Quote Request";

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
      .header { background-color: ${brandColor}; padding: 24px; text-align: center; color: #ffffff; }
      .content { padding: 32px; color: #374151; }
      .field { margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; }
      .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; display: block; }
      .value { font-size: 16px; color: #111827; margin: 4px 0 0 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin:0; font-size:24px;">${title}</h1>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">Customer Details</span>
          <p class="value"><strong>${data.name || 'N/A'}</strong></p>
          <p class="value"><a href="mailto:${data.email}">${data.email || 'N/A'}</a></p>
          ${data.phone ? `<p class="value"><a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
        </div>
        <div class="field">
          <span class="label">Service Requested</span>
          <p class="value">${data.service === 'Other' ? data.serviceOther || 'Other' : (data.service || 'N/A')}</p>
        </div>
        <div class="field">
          <span class="label">Location (ZIP Code)</span>
          <p class="value">${data.zip || 'N/A'}</p>
        </div>
        <div class="field">
          <span class="label">${isBooking ? 'Preferred Timing' : 'Urgency'}</span>
          <p class="value">${data.preferredTiming || data.urgency || 'N/A'}</p>
        </div>
        ${data.details ? `
        <div class="field">
          <span class="label">Additional Details</span>
          <p class="value" style="white-space: pre-wrap;">${data.details}</p>
        </div>
        ` : ''}
      </div>
    </div>
  </body>
  </html>
  `;
}

// 2. Template for the CUSTOMER (centered card layout for better email client support)
function generateCustomerHTML(data: any) {
  const isBooking = data.formType === 'booking';
  const requestType = isBooking ? 'booking' : 'quote';
  const serviceText = data.service === 'Other' ? (data.serviceOther || 'your selected service') : (data.service || 'your selected service');
  const firstName = data.name && data.name.trim() ? data.name.trim().split(/\s+/)[0] : 'there';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #e5e7eb; }
      .wrapper { width: 100%; background-color: #e5e7eb; padding: 32px 16px; }
      .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
      .header { background-color: #1f2937; padding: 24px 32px; text-align: center; }
      .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
      .content { padding: 32px; color: #374151; line-height: 1.65; font-size: 15px; }
      .content p { margin: 0 0 16px 0; }
      .content p:last-of-type { margin-bottom: 0; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #e5e7eb;">
        <tr>
          <td align="center" style="padding: 32px 16px;">
            <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 12px; overflow: hidden;">
              <tr>
                <td class="header" style="background-color: #1f2937; padding: 24px 32px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">We received your request!</h1>
                </td>
              </tr>
              <tr>
                <td class="content" style="padding: 32px; color: #374151; line-height: 1.65; font-size: 15px;">
                  <p style="margin: 0 0 16px 0;">Hi ${firstName},</p>
                  <p style="margin: 0 0 16px 0;">Thanks for reaching out to Deals of Quality! This email is just to let you know that we successfully received your ${requestType} request for <strong>${serviceText}</strong>.</p>
                  <p style="margin: 0 0 16px 0;">Our team is reviewing your details right now, and one of our team members will be in touch with you shortly.</p>
                  <p style="margin: 0 0 16px 0;">If you need immediate assistance, feel free to reply directly to this email or give us a call at (818) 584-7389.</p>
                  <p style="margin: 0;">Kindest regards,<br>The Deals of Quality Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
  </html>
  `;
}

// 3. The Edge-friendly POST handler
export async function POST({ request, locals }: any) {
  try {
    const data = await request.json();
    
    // Setup Environment Variables
    const apiKey = import.meta.env.RESEND_API_KEY || (locals.runtime?.env?.RESEND_API_KEY);
    const fromEmail = import.meta.env.FROM_EMAIL || (locals.runtime?.env?.FROM_EMAIL) || "onboarding@resend.dev";
    const toEmail = import.meta.env.NOTIFICATION_EMAIL || (locals.runtime?.env?.NOTIFICATION_EMAIL);

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
    }

    // --- EMAIL 1: Send to You (The Owner) ---
    const ownerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: `New ${data.formType === 'booking' ? 'Booking' : 'Quote'} from ${data.name || 'Website'}`,
        html: generateOwnerHTML(data)
      })
    });

    if (!ownerResponse.ok) {
      const errorData = await ownerResponse.json();
      console.error("Resend Owner API Error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to send owner email" }), { status: 500 });
    }

    // --- EMAIL 2: Send to the Customer ---
    if (data.email) {
      const customerResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromEmail,
          to: data.email,
          subject: `Request Received - Deals of Quality`,
          html: generateCustomerHTML(data)
        })
      });

      if (!customerResponse.ok) {
        // We log this but don't fail the whole form submission if the customer email bounces
        console.error("Resend Customer API Error:", await customerResponse.json());
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
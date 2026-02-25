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

// 2. Template for the CUSTOMER
function generateCustomerHTML(data: any) {
  const brandColor = "#f97316";
  const isBooking = data.formType === 'booking';
  const serviceText = data.service === 'Other' ? (data.serviceOther || 'your requested service') : (data.service || 'your requested service');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
      .header { background-color: #1f2937; padding: 24px; text-align: center; color: #ffffff; }
      .content { padding: 32px; color: #374151; line-height: 1.6; }
      .button { display: inline-block; background-color: ${brandColor}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin:0; font-size:24px;">We received your request!</h1>
      </div>
      <div class="content">
        <p>Hi ${data.name.split(' ')[0]},</p>
        <p>Thanks for reaching out to Deals of Quality! This email is just to let you know that we successfully received your ${isBooking ? 'booking' : 'quote'} request for <strong>${serviceText}</strong>.</p>
        <p>Our team is reviewing your details right now, and one of our verified local pros will be in touch with you shortly at this email address or by phone.</p>
        <p>If you need immediate assistance, feel free to reply directly to this email or give us a call.</p>
        <p>Best regards,<br>The Deals of Quality Team</p>
      </div>
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
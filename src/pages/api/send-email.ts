export const prerender = false;

// The HTML template function we built earlier
function generateEmailHTML(data: any) {
  const brandColor = "#f97316";
  const isBooking = data.formType === 'booking';
  const title = isBooking ? "New Booking Request" : "New Quote Request";

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
      .header { background-color: ${brandColor}; padding: 24px; text-align: center; color: #ffffff; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
      .content { padding: 32px; color: #374151; }
      .field { margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px; }
      .field:last-child { border-bottom: none; }
      .label { font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px; display: block; }
      .value { font-size: 16px; color: #111827; margin: 0; }
      .footer { background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${title}</h1>
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
          ${data.category ? `<p class="value" style="font-size: 14px; color: #4b5563;">Category: ${data.category}</p>` : ''}
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
      <div class="footer">
        Received via your Deals of Quality website form.
      </div>
    </div>
  </body>
  </html>
  `;
}

// The Edge-friendly POST handler
export async function POST({ request, locals }: any) {
  try {
    const data = await request.json();
    
    // Cloudflare safely maps dashboard variables here, with a fallback to local env
    const apiKey = import.meta.env.RESEND_API_KEY || (locals.runtime?.env?.RESEND_API_KEY);
    const fromEmail = import.meta.env.FROM_EMAIL || (locals.runtime?.env?.FROM_EMAIL) || "onboarding@resend.dev";
    const toEmail = import.meta.env.NOTIFICATION_EMAIL || (locals.runtime?.env?.NOTIFICATION_EMAIL);

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
    }

    const htmlContent = generateEmailHTML(data);
    const subjectLine = `New ${data.formType === 'booking' ? 'Booking' : 'Quote'} from ${data.name || 'Website'}`;

    // Direct fetch to Resend (No SDK required)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject: subjectLine,
        html: htmlContent
      })
    });

    if (resendResponse.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      const errorData = await resendResponse.json();
      console.error("Resend API Error:", errorData);
      return new Response(JSON.stringify({ error: "Failed to send email through Resend" }), { status: 500 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return res.status(500).json({
        error: 'Email service is currently unconfigured. Please contact us directly by phone or WhatsApp.',
      });
    }

    const resend = new Resend(apiKey);
    const { firstName, lastName, email, phone, company, project, message } = req.body || {};

    if (!firstName?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'First name and email are required.' });
    }

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@diarchhomes.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Diarch Homes Enquiries <onboarding@resend.dev>';

    const fullName = `${firstName.trim()} ${lastName?.trim() || ''}`.trim();
    
    let projectLabel = 'General Inquiry';
    if (project === 'vaidic-village') projectLabel = 'Vaidic Village (Naubatpur, Patna)';
    else if (project === 'mutation') projectLabel = 'Mutation / Title Transfer Desk';
    else if (project) projectLabel = project;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #0b1320; color: #f4eedb; border: 1px solid #c9a96e; border-radius: 8px;">
        <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(201, 169, 110, 0.35); padding-bottom: 14px;">
          <h2 style="color: #c9a96e; margin: 0 0 6px 0; font-size: 20px; letter-spacing: 0.05em; text-transform: uppercase;">New Diarch Homes Enquiry</h2>
          <p style="color: #94a3b8; margin: 0; font-size: 13px;">Received via diarchhomes.com contact form</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; width: 140px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">Name:</td>
            <td style="padding: 10px 0; color: #f4eedb; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 500;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">Email:</td>
            <td style="padding: 10px 0; color: #f4eedb; border-bottom: 1px solid rgba(255,255,255,0.06);"><a href="mailto:${email}" style="color: #c9a96e; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">Phone:</td>
            <td style="padding: 10px 0; color: #f4eedb; border-bottom: 1px solid rgba(255,255,255,0.06);">${phone?.trim() ? `<a href="tel:${phone.trim()}" style="color: #c9a96e; font-weight: 600; text-decoration: none;">${phone.trim()}</a>` : '<span style="color: #64748b; font-style: italic;">Not provided</span>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">Organization:</td>
            <td style="padding: 10px 0; color: #f4eedb; border-bottom: 1px solid rgba(255,255,255,0.06);">${company?.trim() || '<span style="color: #64748b; font-style: italic;">N/A</span>'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">Inquiry Type:</td>
            <td style="padding: 10px 0; color: #c9a96e; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${projectLabel}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0 6px 0; color: #94a3b8; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 12px 0 6px 0; color: #f4eedb; white-space: pre-wrap; line-height: 1.5;">${message?.trim() || '<span style="color: #64748b; font-style: italic;">No message entered.</span>'}</td>
          </tr>
        </table>
        <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid rgba(201, 169, 110, 0.25); font-size: 11px; color: #94a3b8; display: flex; justify-content: space-between;">
          <span>Diarch Homes Notification</span>
          <span>Patna, Bihar</span>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Enquiry from ${fullName} - ${projectLabel}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend delivery error:', error);
      return res.status(error.statusCode || 400).json({
        error: error.message || 'Failed to dispatch enquiry email via Resend.',
      });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Unhandled email dispatch error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
}

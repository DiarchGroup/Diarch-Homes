import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, company, project, message } = req.body || {};

    if (!firstName || !email) {
      return res.status(400).json({ error: 'First name and email are required' });
    }

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'info@diarchhomes.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Diarch Homes Enquiries <onboarding@resend.dev>';

    const fullName = `${firstName} ${lastName || ''}`.trim();
    const projectLabel = project === 'vaidic-village' ? 'Vaidic Village' : (project || 'General Inquiry');

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b1320; color: #f4eedb; border: 1px solid #c9a96e; border-radius: 8px;">
        <h2 style="color: #c9a96e; margin-top: 0; border-bottom: 1px solid rgba(201, 169, 110, 0.3); padding-bottom: 12px;">New Site Visit / Project Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; width: 140px; font-weight: bold;">Name:</td>
            <td style="padding: 8px 0; color: #f4eedb;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #f4eedb;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Organization:</td>
            <td style="padding: 8px 0; color: #f4eedb;">${company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Inquiry / Project:</td>
            <td style="padding: 8px 0; color: #c9a96e; font-weight: bold;">${projectLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; color: #f4eedb; white-space: pre-wrap;">${message || 'No additional message provided.'}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(201, 169, 110, 0.2); font-size: 12px; color: #94a3b8;">
          Sent from Diarch Homes Website
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Enquiry from ${fullName} - ${projectLabel}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend email error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}

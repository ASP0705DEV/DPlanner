import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // Enable CORS if needed
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const {
      vibe_title,
      hindi_title,
      love_slogan,
      preferred_timing,
      preferred_date,
      special_note,
      vehicle_choice,
      chill_audience,
      sub_choices,
      pitstop_treat,
      spot_name,
      spot_locality,
      maps_url,
      submitted_at,
    } = req.body || {};

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER || 'saiprithvi0705@gmail.com';
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || 'brytuohojhsfblwt';
    const recipient = process.env.NOTIFICATION_RECIPIENT || 'saiprithvi0705@gmail.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const choicesHtml = Array.isArray(sub_choices) && sub_choices.length > 0
      ? `<div style="margin: 12px 0; padding: 12px; background: #FFF8F0; border-radius: 12px; border: 1px solid #FFB7C5;">
          <strong style="color: #49333A; font-size: 13px;">Selected Details:</strong>
          <ul style="margin: 6px 0 0 16px; padding: 0; color: #49333A; font-size: 13px;">
            ${sub_choices.map((c: string) => `<li style="margin-bottom: 4px;">${c}</li>`).join('')}
          </ul>
        </div>`
      : '';

    const vehicleHtml = vehicle_choice
      ? `<p style="margin: 6px 0; font-size: 13px; color: #49333A;"><strong>🛵 Ride Choice:</strong> <span style="color: #E94F64; font-weight: bold; text-transform: capitalize;">${vehicle_choice}</span></p>`
      : '';

    const audienceHtml = chill_audience
      ? `<p style="margin: 6px 0; font-size: 13px; color: #49333A;"><strong>👥 Circle:</strong> <span style="color: #6D28D9; font-weight: bold;">${chill_audience === 'just-us' ? 'Just Sonu & Chotu' : 'With All the Siblings'}</span></p>`
      : '';

    const pitstopHtml = pitstop_treat
      ? `<p style="margin: 6px 0; font-size: 13px; color: #49333A;"><strong>🍔 Pitstop Treat:</strong> <span style="color: #E94F64; font-weight: bold;">${pitstop_treat}</span></p>`
      : '';

    const spotHtml = spot_name
      ? `<p style="margin: 6px 0; font-size: 13px; color: #49333A;"><strong>📍 Destination:</strong> <strong>${spot_name}</strong> (${spot_locality || 'Jamshedpur'}) ${maps_url ? `<a href="${maps_url}" style="color: #E94F64; text-decoration: underline; margin-left: 6px;">Open Map</a>` : ''}</p>`
      : '';

    const noteHtml = special_note
      ? `<div style="margin: 16px 0; padding: 14px; background: #FFE0E6; border-radius: 12px; border-left: 4px solid #E94F64;">
          <strong style="color: #E94F64; font-size: 12px; text-transform: uppercase;">💌 Chotu's Note for Sonu:</strong>
          <p style="margin: 6px 0 0 0; color: #49333A; font-size: 15px; font-style: italic;">“${special_note}”</p>
        </div>`
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Date Planned by Chotu</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFF8F0; margin: 0; padding: 24px; color: #49333A;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 2px solid #FFB7C5; box-shadow: 0 8px 24px rgba(233, 79, 100, 0.12);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FFB7C5 0%, #E94F64 100%); padding: 24px 20px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">💌 Chotu Has Planned a Date!</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.95;">Our Little Date Planner Notification</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 24px 22px;">
              <!-- Vibe Pill -->
              <div style="background-color: #FFF0F5; border: 1px solid #FFB7C5; border-radius: 14px; padding: 16px; margin-bottom: 16px; text-align: center;">
                <span style="display: inline-block; background-color: #E94F64; color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 12px; text-transform: uppercase; margin-bottom: 8px;">Selected Vibe</span>
                <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #E94F64;">${vibe_title || 'Date Vibe'}</h2>
                ${hindi_title ? `<p style="margin: 0; font-size: 13px; color: #49333A; font-weight: 600;">(${hindi_title})</p>` : ''}
                ${love_slogan ? `<p style="margin: 10px 0 0 0; font-size: 13px; color: #E94F64; font-style: italic; background: #ffffff; padding: 8px 12px; border-radius: 8px; border: 1px dashed #FFB7C5;">${love_slogan}</p>` : ''}
              </div>

              <!-- Customization Details -->
              <div style="border-top: 1px solid #FFE0E6; padding-top: 14px; margin-top: 14px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; color: #E94F64; letter-spacing: 0.5px;">Date Details</h3>
                ${vehicleHtml}
                ${audienceHtml}
                ${choicesHtml}
                ${pitstopHtml}
                ${spotHtml}
                <p style="margin: 6px 0; font-size: 13px; color: #49333A;"><strong>⏰ Preferred Timing:</strong> <span style="color: #E94F64; font-weight: bold; text-transform: capitalize;">${preferred_timing || 'Any Time'}</span> ${preferred_date ? `(${preferred_date})` : ''}</p>
              </div>

              ${noteHtml}

              <!-- Action Call -->
              <div style="margin-top: 24px; padding: 16px; background-color: #FFF8EB; border: 1px dashed #FDE68A; border-radius: 14px; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #92400E;">💖 Ready for Sonu duties?</p>
                <p style="margin: 0; font-size: 12px; color: #92400E;">Chotu is waiting for you to make this date happen in Jamshedpur!</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FFF8F0; padding: 14px 20px; text-align: center; border-top: 1px solid #FFE0E6; font-size: 11px; color: #49333A; opacity: 0.7;">
              Sent automatically to Sonu (${recipient}) at ${submitted_at || new Date().toLocaleString()}
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"DATE PLANNER" <${user}>`,
      to: recipient,
      subject: `💌 Chotu planned a date: ${vibe_title || 'New Date'} (${preferred_timing || 'Upcoming'})`,
      html: htmlContent,
      text: `Hey Sonu!\n\nChotu just submitted a date plan on Our Little Date Planner!\n\nVibe: ${vibe_title} (${hindi_title || ''})\nTiming: ${preferred_timing} ${preferred_date ? `(${preferred_date})` : ''}\nNote: ${special_note || 'None'}\n\nCheck your Date Planner and make this happen! 💕`,
    });

    console.log('Date notification email sent successfully:', info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Error sending date notification email:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}

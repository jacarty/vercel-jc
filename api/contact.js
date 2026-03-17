// Vercel Serverless Function — Contact form via Mailgun
// Environment variables required in Vercel dashboard:
//   MAILGUN_API_KEY    — your Mailgun API key
//   MAILGUN_DOMAIN     — your Mailgun sending domain (e.g. mg.jamescarty.co.uk)
//   CONTACT_EMAIL      — where you want to receive messages

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !CONTACT_EMAIL) {
    console.error('Missing Mailgun environment variables');
    return res.status(500).json({ error: 'Mail service not configured.' });
  }

  // Mailgun EU endpoint — change to api.mailgun.net if US region
  const mailgunUrl = `https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

  const formData = new URLSearchParams();
  formData.append('from', `${name} <mailgun@${MAILGUN_DOMAIN}>`);
  formData.append('to', CONTACT_EMAIL);
  formData.append('subject', `[jamescarty.co.uk] Message from ${name}`);
  formData.append('text', [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message
  ].join('\n'));
  formData.append('h:Reply-To', email);

  try {
    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('api:' + MAILGUN_API_KEY).toString('base64'),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mailgun error:', response.status, errorText);
      return res.status(500).json({ error: 'Failed to send message.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

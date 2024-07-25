const { google } = require('googleapis');
const oauth2Client = require("../services/google")

google.options({ auth: oauth2Client });

const getEmails = async (req, res) => {
  const { pageToken } = req.query;
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch the messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 50,
      pageToken: pageToken || undefined,
    });

    const messages = response.data.messages || [];
    const nextPageToken = response.data.nextPageToken || null;

    // Fetch message details
    const messageDetailsPromises = messages.map(async (message) => {
      const messageDetails = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });
      return messageDetails.data;
    });

    const messageDetails = await Promise.all(messageDetailsPromises);

    res.json({
      messages: messageDetails,
      nextPageToken: nextPageToken,
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

const sendEmail = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Both subject and message are required' });
  }

  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const email = [
      `To: recipient@example.com`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n');

    const encodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


module.exports = {sendEmail,getEmails}
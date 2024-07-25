const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('API key for Google Generative AI is missing. Please set GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

google.options({ auth: oauth2Client });

let userEmail = ''; 
let userId = '';     // To store the authenticated user's email address

// Middleware to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  try {
    oauth2Client.setCredentials({ access_token: token });
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    userEmail = payload.email;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/prompt', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.get('/api/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // const token = tokens.access_token

    // // Set the access token in a cookie
    // res.cookie('access_token', token);

    // Fetch the authenticated user's email address
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    userEmail = userInfo.data.email;

    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.get('/api/emails', async (req, res) => {
  const { pageToken } = req.query;

  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch the messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 25,
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
});

app.post('/api/sendEmail', isAuthenticated, async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Both subject and message are required' });
    }

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
});

app.get('/api/logout', (req, res) => {
  userEmail = '';
  oauth2Client.revokeCredentials((err) => {
    if (err) {
      console.error('Error revoking token:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
  });
});

app.get('/', (req, res) => {
  res.json('health check');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

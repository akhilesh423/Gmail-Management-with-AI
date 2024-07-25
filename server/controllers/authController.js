const { google } = require('googleapis');
// const { googleClientId, googleClientSecret, googleRedirectUri } = require('../config/config');

// const oauth2Client = new google.auth.OAuth2(
//   googleClientId,
//   googleClientSecret,
//   googleRedirectUri
// );
const oauth2Client = require("../services/google")

google.options({ auth: oauth2Client });

const auth = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  console.log(oauth2Client)
  res.redirect(authUrl);
};

const oauth2callback = async (req, res) => {
    console.log("reached here")
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.cookie('id_token', tokens.id_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
  
    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

const logout = (req, res) => {
  oauth2Client.revokeCredentials((err) => {
    if (err) {
      console.error('Error revoking token:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('access_token');
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  auth,
  oauth2callback,
  logout
};

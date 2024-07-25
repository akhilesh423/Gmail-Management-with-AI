const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2();

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.id_token;
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
    console.log(payload)
    req.user = payload;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuthenticated;

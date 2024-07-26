const { google } = require('googleapis');
const UserToken = require('../routes/authRoutes');
const oauth2Client = new google.auth.OAuth2();

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.id_token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user = await UserToken.findOne({ email: payload.email });
   console.log(user)
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuthenticated;

const { google } = require('googleapis');
const UserToken = require("../dbSchema/userToken")
// const { googleClientId, googleClientSecret, googleRedirectUri } = require('../config/config');

// const oauth2Client = new google.auth.OAuth2(
//   googleClientId,
//   googleClientSecret,
//   googleRedirectUri
// );
const oauth2Client = require("../services/google")

google.options({ auth: oauth2Client });

const auth = (req, res) => {
  const query = req.query 
  console.log(query)
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

    const { id_token, access_token, refresh_token, expiry_date } = tokens;
    const payload = await oauth2Client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const email = payload.getPayload().email;

    await UserToken.findOneAndUpdate(
      { email },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(expiry_date),
      },
      { upsert: true, new: true }
    );

    // res.cookie('id_token', tokens.id_token, {
    //   httpOnly: true,
    //   secure: true,
    // });
    res.cookie("id_token", tokens.id_token)

    res.redirect('https://gmail-management-with-ai.vercel.app/inbox');
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
const logout = async (req, res) => {
  const user = req.user;

  if (!user || !user.email) {
    return res.status(400).json({ error: 'No user information found' });
  }

  try {
    // Retrieve the user's token from the database
    const userToken = await UserToken.findOne({ email: user.email });

    if (!userToken) {
      return res.status(400).json({ error: 'User token not found' });
    }

    // Revoke the access token
    await oauth2Client.revokeToken(userToken.accessToken);

    // Clear the user's tokens from the database
    await UserToken.deleteOne({ email: user.email });

    // Clear the id_token cookie
    res.clearCookie('id_token');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error revoking token:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};
module.exports = {
  auth,
  oauth2callback,
  logout
};

// config/oauth2Client.js
const { google } = require('googleapis');
const { googleClientId, googleClientSecret, googleRedirectUri } = require('../config/config');

const oauth2Client = new google.auth.OAuth2(
  googleClientId,
  googleClientSecret,
  googleRedirectUri
);

module.exports = oauth2Client;

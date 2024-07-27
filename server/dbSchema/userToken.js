const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;

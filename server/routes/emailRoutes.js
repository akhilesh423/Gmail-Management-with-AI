const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getInboxEmails,getDrafts,getSentEmails, sendEmail} = require('../controllers/emailController');

const router = express.Router();

router.get('/inbox',isAuthenticated, getInboxEmails);
router.get('/drafts',isAuthenticated, getDrafts);
router.get('/sent',isAuthenticated, getSentEmails);
router.post('/sendEmail', isAuthenticated,sendEmail);

module.exports = router;

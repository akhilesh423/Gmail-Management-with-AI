const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { getEmails,sendEmail } = require('../controllers/emailController');

const router = express.Router();

router.get('/getEmails',isAuthenticated, getEmails);
router.post('/sendEmail', isAuthenticated,sendEmail);

module.exports = router;

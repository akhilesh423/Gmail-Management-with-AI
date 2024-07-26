const express = require('express');
const { auth, oauth2callback, logout } = require('../controllers/authController');
const aiResponse = require("../controllers/aiResponse")
const isAuthenticated = require('../middlewares/isAuthenticated');


const router = express.Router();

router.get('/login', auth);
router.get('/oauth2callback', oauth2callback);
router.get('/logout',isAuthenticated, logout);
router.post('/prompt',isAuthenticated,aiResponse)

module.exports = router;

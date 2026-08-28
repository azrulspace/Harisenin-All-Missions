const express = require('express');
const { login, register, sendOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/otp/send', sendOtp);

module.exports = router;

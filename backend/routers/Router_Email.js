const express = require('express');
const router = express.Router();
const multer = require('multer');
const { forgetpasswordemail, verifyOtp, resetPassword } = require('../controller/Conrtrol_Email');
const { otpLimiter } = require('../middleware/rateLimiter');

const upload = multer();

// OTP requests are rate-limited to prevent email spam/abuse
router.post('/forgetemail', upload.none(), otpLimiter, forgetpasswordemail);
router.post('/verify-otp', upload.none(), verifyOtp);
router.post('/reset-password', upload.none(), resetPassword);

module.exports = router;

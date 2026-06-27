const rateLimit = require('express-rate-limit');

/**
 * authLimiter — applied to /login, /signin, /signup, /forgetemail
 * Blocks an IP after 10 attempts within a 15-minute window.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many attempts from this IP. Please try again after 15 minutes.',
  },
});

/**
 * otpLimiter — stricter limit for the OTP endpoint
 * Blocks after 5 attempts within 15 minutes.
 */
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many OTP requests. Please try again after 15 minutes.',
  },
});

module.exports = { authLimiter, otpLimiter };

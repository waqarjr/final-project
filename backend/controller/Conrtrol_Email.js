const { sendMail } = require('../utils/mailer');
const asyncHandler = require('../utils/asyncHandler');
const sign = require('../model/model_userSignUp');
const { otpStore } = require('./Control_Login');

// Generate and send OTP for Password Reset
const forgetpasswordemail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Ensure the user exists
  const user = await sign.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(400).json({ error: 'No user registered with this email.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes TTL

  // Store in map
  otpStore.set(email.toLowerCase(), { otp, expiresAt });

  // Send email
  await sendMail(
    email,
    'Reset Password OTP',
    `Your One-Time Password is: ${otp}. It will expire in 5 minutes.`
  );

  res.json({ message: 'OTP sent to your email successfully.' });
});

// Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const record = otpStore.get(email.toLowerCase());
  if (!record) {
    return res.status(400).json({ error: 'No OTP generated or OTP has expired.' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return res.status(400).json({ error: 'OTP has expired.' });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP.' });
  }

  // OTP verified successfully — mark verified flag (can be used to reset password)
  record.verified = true;
  otpStore.set(email.toLowerCase(), record);

  res.json({ message: 'OTP verified successfully.' });
});

// Reset Password after OTP Verification
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const record = otpStore.get(email.toLowerCase());
  if (!record || !record.verified) {
    return res.status(400).json({ error: 'OTP verification is required before resetting password.' });
  }

  // Update password in DB
  const user = await sign.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  // Password will be hashed in the pre-save hook of the model
  user.password = password;
  await user.save();

  // Clear OTP record
  otpStore.delete(email.toLowerCase());

  res.json({ message: 'Password has been reset successfully.' });
});

module.exports = { forgetpasswordemail, verifyOtp, resetPassword };
const nodemailer = require('nodemailer');

/**
 * Centralised nodemailer transport.
 * Reads credentials from environment variables — no hardcoding.
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email.
 * @param {string} to       - Recipient email address
 * @param {string} subject  - Email subject
 * @param {string} text     - Plain-text body
 */
const sendMail = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

module.exports = { sendMail };

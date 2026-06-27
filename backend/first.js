// Polyfill for SlowBuffer to prevent crashes in old dependencies (like buffer-equal-constant-time) on newer Node.js versions
const buffer = require('buffer');
if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}

// Load environment variables first — must be before any other imports
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

// ─── Database Connection (single connection for the entire app) ──────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// ─── Security Middleware ─────────────────────────────────────────────────────
// Helmet adds secure HTTP response headers (X-Frame-Options, CSP, HSTS, etc.)
app.use(helmet());

// CORS — restrict to your known frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true, // Required for httpOnly cookies
  })
);

// ─── Body / Cookie Parsing ───────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Static Files ────────────────────────────────────────────────────────────
app.use('/images', express.static('images'));

// ─── Routes ─────────────────────────────────────────────────────────────────
const category   = require('./routers/RouteCategory');
const manufacture = require('./routers/Route_manufacture');
const products   = require('./routers/Routes_Products');
const carousel   = require('./routers/Route_Carousel');
const websetting = require('./routers/Route_Websetting');
const login      = require('./routers/Route_login');
const email      = require('./routers/Router_Email');

app.use('/', manufacture);
app.use('/', category);
app.use('/', products);
app.use('/', carousel);
app.use('/', websetting);
app.use('/', login);
app.use('/', email);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ─── Global Error Handler ────────────────────────────────────────────────────
// Must have exactly 4 parameters for Express to treat it as an error handler.
// Never return raw error messages or stack traces to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);
  res.status(err.status || 500).json({
    error: 'An internal server error occurred. Please try again later.',
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
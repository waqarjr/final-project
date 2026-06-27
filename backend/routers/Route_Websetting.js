const express = require('express');
const router = express.Router();
const multer = require('multer');
const { update, read, updateIcon, readIcon } = require('../controller/Control_Websetting');
const { verifyAdmin } = require('../middleware/authMiddleware');

const upload = multer();

// Storage config for icon changes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/icon');
  },
  filename: function (req, file, cb) {
    const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  },
});
const uploadIcon = multer({ storage: storage });

// ─── Public Routes ───────────────────────────────────────────────────────────
router.get('/readwebsetting', read);
router.get('/readicon', readIcon);

// ─── Admin Routes ────────────────────────────────────────────────────────────
router.post('/updatewebsetting', verifyAdmin, upload.none(), update);
router.post('/updateicon', verifyAdmin, uploadIcon.single('icon'), updateIcon);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  read_update_carousel,
  creat_carousel,
  read_carousel,
  delete_carousel,
  update_carousel,
  select_update_carousel,
} = require('../controller/Control_Carousel');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Shared Disk Storage Configuration for Carousel
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/carousel');
  },
  filename: function (req, file, cb) {
    const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  },
});

const uploads = multer({ storage: storage });

// ─── Public Routes ───────────────────────────────────────────────────────────
router.get('/readcarousel', read_carousel);
router.get('/readupdatecarousel/:id', read_update_carousel);

// ─── Admin Routes ────────────────────────────────────────────────────────────
router.post('/creatcarousel', verifyAdmin, uploads.single('image'), creat_carousel);
router.post('/updatecarousel/:id', verifyAdmin, uploads.single('image'), update_carousel);
router.delete('/deletecarousel/:id', verifyAdmin, delete_carousel); // Changed from GET to DELETE
router.post('/selectupdatecarousel/:id', verifyAdmin, select_update_carousel);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  read_update_manufacture,
  creat_manufacture,
  read_manufacture,
  delete_manufacture,
  update_manufacture,
  select_update,
} = require('../controller/Control_manufacture');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Shared Disk Storage Configuration for Manufacturers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/manufactuer');
  },
  filename: function (req, file, cb) {
    const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  },
});

const uploads = multer({ storage: storage });

// ─── Public Routes ───────────────────────────────────────────────────────────
router.get('/readmanufacture', read_manufacture);
router.post('/readmanufacture', read_manufacture);
router.get('/readupdatemanufacture/:id', read_update_manufacture);

// ─── Admin Routes ────────────────────────────────────────────────────────────
router.post('/creatmanufacture', verifyAdmin, uploads.single('image'), creat_manufacture);
router.post('/updatemanufacture/:id', verifyAdmin, uploads.single('image'), update_manufacture);
router.delete('/deletemanufacture/:id', verifyAdmin, delete_manufacture); // Changed from GET to DELETE
router.post('/selectupdate_manufacture/:id', verifyAdmin, select_update);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  read_update_category,
  creat_category,
  read_category,
  delete_category,
  update_category,
  select_update,
} = require('../controller/ContolCategories');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Shared Disk Storage Configuration for Categories
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/categories');
  },
  filename: function (req, file, cb) {
    const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  },
});

const uploads = multer({ storage: storage });

// ─── Public Routes ───────────────────────────────────────────────────────────
router.get('/readcategory', read_category);
router.post('/readcategory', read_category);
router.get('/readupdatecategory/:id', read_update_category);

// ─── Admin Routes ────────────────────────────────────────────────────────────
router.post('/creatcategories', verifyAdmin, uploads.single('image'), creat_category);
router.post('/updatecategory/:id', verifyAdmin, uploads.single('image'), update_category);
router.delete('/deletecategory/:id', verifyAdmin, delete_category); // Changed from GET to DELETE
router.post('/selectupdate/:id', verifyAdmin, select_update);

module.exports = router;
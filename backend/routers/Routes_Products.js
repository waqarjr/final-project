const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  select_update_state,
  insertImage,
  readData,
  update_Read_Data,
  update_Mul_Images,
  mul_Del_Image,
  update,
  deleteData,
  front_filter,
} = require('../controller/Control_Products');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Shared Disk Storage Configuration for Products
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Images/products');
  },
  filename: function (req, file, cb) {
    const file_name = `${Date.now()}-${file.originalname}`;
    cb(null, file_name);
  },
});

const uploads = multer({ storage: storage });
const uploadNone = multer();

// ─── Public Routes ───────────────────────────────────────────────────────────
router.get('/read-product', readData);
router.post('/read-product', readData);
router.get('/read-update-product/:id', update_Read_Data);
router.get('/read-mul-image-product/:id', update_Mul_Images);
router.post('/frontfilter', uploadNone.none(), front_filter);

// ─── Admin Routes ────────────────────────────────────────────────────────────
router.post(
  '/creat-product',
  verifyAdmin,
  uploads.fields([{ name: 'image' }, { name: 'multipleImages' }]),
  insertImage
);

router.post(
  '/update-product/:id',
  verifyAdmin,
  uploads.fields([{ name: 'image' }, { name: 'multipleImages' }]),
  update
);

router.delete('/deletedata/:id', verifyAdmin, deleteData); // Changed from GET to DELETE
router.delete('/del-mul-image-product/:id', verifyAdmin, mul_Del_Image); // Changed from GET to DELETE
router.post('/selectupdatestate/:id', verifyAdmin, select_update_state);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  login,
  conformpassword,
  changeConformpassword,
  signup,
  signin,
  contactus,
  review,
  getReviews,
  cartitems,
  cartPrducts,
  deleteCart,
  accoutinfo,
  changePasswordUser,
  signout,
  changeQuantity,
  final,
  findOrders,
  findCustomer_Data,
  findCustomer_Product,
  accountUserData,
  emptyCart,
  customerStatus,
} = require('../controller/Control_Login');

const { verifyAdmin, verifyUser } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// For multipart/form-data with no files
const upload = multer();

// ─── Public Auth Routes (With Rate Limiting) ─────────────────────────────────
router.post('/login', upload.none(), authLimiter, login);
router.post('/signup', upload.none(), authLimiter, signup);
router.post('/signin', upload.none(), authLimiter, signin);
router.post('/signout', signout);

// ─── Public Storefront Routes ────────────────────────────────────────────────
router.post('/contactus', upload.none(), contactus);
router.post('/reviews', upload.none(), review);
router.get('/getreviews/:id', getReviews);

// ─── User Protected Routes ───────────────────────────────────────────────────
router.post('/account-info', verifyUser, accoutinfo);
router.post('/change-password', upload.none(), verifyUser, changePasswordUser);

// Cart management
router.post('/cartitems', verifyUser, cartitems);
router.post('/cart-product', verifyUser, cartPrducts);
router.delete('/del-cart/:id', verifyUser, deleteCart); // Method changed to DELETE
router.post('/chnagequantity', verifyUser, changeQuantity);
router.post('/empty-cart', verifyUser, emptyCart);

// Order placement
router.post('/finalorder', upload.none(), verifyUser, final);
router.post('/account-userdata', verifyUser, accountUserData);

// Order details (accessible by order owner or admin)
router.post('/siglecus-data/:id', verifyUser, findCustomer_Data);
router.post('/singcus-product/:id', verifyUser, findCustomer_Product);

// ─── Admin Protected Routes ──────────────────────────────────────────────────
router.post('/conformpassword', upload.none(), verifyAdmin, conformpassword);
router.post('/changepassword', upload.none(), verifyAdmin, changeConformpassword);
router.get('/customerorder', verifyAdmin, findOrders);
router.post('/customer-status', verifyAdmin, customerStatus);

module.exports = router;
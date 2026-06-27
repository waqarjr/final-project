const Login = require('../model/model_login');
const bcrypt = require('bcrypt');
const sign = require('../model/model_userSignUp');
const contact = require('../model/model_Contactus');
const reviewsalpha = require('../model/model_reviews');
const cart = require('../model/model_cart');
const order = require('../model/model_orders');
const items = require('../model/model_items');
const Product = require('../model/module_Products');
const { sendMail } = require('../utils/mailer');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

// Store OTPs in-memory with expiration times (5 minutes)
const otpStore = new Map();

// Helper to generate and set JWT token in HttpOnly cookie
const setTokenCookie = (res, payload, name) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
};

// Admin Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const alpha = await Login.findOne({ email });
  if (!alpha) {
    return res.status(400).json({ message: 'Email is incorrect' });
  }

  if (bcrypt.compareSync(password, alpha.password)) {
    setTokenCookie(res, { id: alpha._id, email: alpha.email, role: 'admin' }, 'adminToken');
    res.json({ a: true });
  } else {
    res.status(400).json({ message: 'Password is incorrect' });
  }
});

// Admin Confirm Password
const conformpassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const alpha = await Login.findOne();
  if (!alpha) {
    return res.status(400).json({ message: 'Admin account not set up.' });
  }

  if (bcrypt.compareSync(password, alpha.password)) {
    res.json({ a: true });
  } else {
    res.status(400).json({ message: 'Password is incorrect' });
  }
});

// Admin Change Password
const changeConformpassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  const alpha = await Login.findOne();
  if (!alpha) {
    return res.status(400).json({ message: 'Admin account not set up.' });
  }

  if (bcrypt.compareSync(oldpassword, alpha.password)) {
    const hashed = bcrypt.hashSync(newpassword, 10);
    await Login.updateOne({ _id: alpha._id }, { $set: { password: hashed } });
    res.json({ a: true });
  } else {
    res.status(400).json({ message: 'Old Password is incorrect' });
  }
});

// User SignUp
const signup = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  
  if (!firstname || !lastname || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existing = await sign.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(400).json({ message: 'This email has already been used' });
  }

  const user = await sign.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    phone,
    password, // pre-save hook handles hashing
  });

  setTokenCookie(res, { id: user._id, email: user.email, role: 'user' }, 'userToken');
  res.json({ sucess: 'Registered successfully', user });
});

// Get User Account Info (IDOR fixed: uses req.user.email)
const accoutinfo = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const alpha = await sign.findOne({ email }).select('-password');
  if (!alpha) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(alpha);
});

// Change User Password (IDOR fixed: uses req.user.email)
const changePasswordUser = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const { currentpassword, newpassword } = req.body;

  const user = await sign.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (bcrypt.compareSync(currentpassword, user.password)) {
    const neee = bcrypt.hashSync(newpassword, 10);
    await sign.updateOne({ email }, { $set: { password: neee } });
    res.json({ cong: 'Password has been updated successfully.' });
  } else {
    res.status(400).json({ message: 'Incorrect password' });
  }
});

// User SignIn
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await sign.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(400).json({ email1: 'Your email is incorrect' });
  }

  if (bcrypt.compareSync(password, user.password)) {
    setTokenCookie(res, { id: user._id, email: user.email, role: 'user' }, 'userToken');
    res.json(user);
  } else {
    res.status(400).json({ password1: 'Your password is incorrect' });
  }
});

// User SignOut
const signout = asyncHandler(async (req, res) => {
  res.clearCookie('userToken');
  res.clearCookie('adminToken');
  res.json({ a: true });
});

// Contact Us
const contactus = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, subject, message } = req.body;
  await contact.create({ firstname, lastname, email, phone, subject, message });
  res.json({ contact: 'Your information has been submitted successfully.' });
});

// Create Review
const review = asyncHandler(async (req, res) => {
  const { reviews, rating, currentDate, currentTime, productId, firstName, lastName } = req.body;
  await reviewsalpha.create({
    reviews,
    rating: Number(rating),
    currentDate,
    currentTime,
    productId,
    firstName,
    lastName,
  });
  res.json({ mess: 'Thanks for giving a review!' });
});

// Get Reviews
const getReviews = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const alpha = await reviewsalpha.find({ productId: id });
  res.json(alpha);
});

// Add Item to Cart (IDOR fixed: uses req.user.email)
const cartitems = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const { productid, quantity } = req.body;

  const product = await Product.findById(productid);
  if (!product || product.status !== 'active') {
    return res.status(404).json({ error: 'Product is not available' });
  }

  const existing = await cart.findOne({ product_id: productid, userEmail: email });
  if (!existing) {
    await cart.create({
      product_id: productid,
      userEmail: email,
      quantity: Number(quantity),
    });
  } else {
    await cart.updateOne({ product_id: productid, userEmail: email }, { $inc: { quantity: Number(quantity) } });
  }
  res.json({ message: 'Item added to cart successfully' });
});

// Get Cart Products (IDOR fixed: uses req.user.email)
const cartPrducts = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const cartItems = await cart.aggregate([
    { $match: { userEmail: email } },
    { $lookup: { from: 'products', localField: 'product_id', foreignField: '_id', as: 'productDetails' } },
    { $unwind: '$productDetails' },
  ]);
  res.json(cartItems);
});

// Delete Cart Item (IDOR / Ownership fixed: check userEmail matches req.user.email)
const deleteCart = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const email = req.user.email;
  const item = await cart.findOne({ _id: id, userEmail: email });
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found or unauthorized' });
  }
  await cart.findByIdAndDelete(id);
  res.json({ a: true });
});

// Update Cart Quantity (IDOR fixed: matches userEmail)
const changeQuantity = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const { id, quantity } = req.body;
  const qty = Number(quantity);
  if (qty < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  
  const item = await cart.findOne({ _id: id, userEmail: email });
  if (!item) {
    return res.status(404).json({ error: 'Cart item not found or unauthorized' });
  }

  await cart.updateOne({ _id: id, userEmail: email }, { $set: { quantity: qty } });
  res.json({ message: 'Item quantity updated successfully' });
});

// Place Final Order (Severe Flaw fixes: server-side total calculation, stock verification, stock decrease)
const final = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const { firstName, lastName, phone, address, postcode, city, productId, currentDate, currentTime, productQty } = req.body;

  // Handle single vs multiple inputs parsed from FormData
  const productIds = Array.isArray(productId) ? productId : [productId];
  const quantities = Array.isArray(productQty) ? productQty : [productQty];

  if (productIds.length === 0 || productIds.length !== quantities.length) {
    return res.status(400).json({ error: 'Invalid order item data' });
  }

  let computedTotal = 0;
  const orderItems = [];

  // Recalculate price and verify stock server-side
  for (let i = 0; i < productIds.length; i++) {
    const prodId = productIds[i];
    const requestedQty = Number(quantities[i]);

    if (isNaN(requestedQty) || requestedQty <= 0) {
      return res.status(400).json({ error: `Invalid quantity for product ID ${prodId}` });
    }

    const prod = await Product.findById(prodId);
    if (!prod || prod.status !== 'active') {
      return res.status(400).json({ error: `Product '${prod ? prod.title : prodId}' is no longer active or available.` });
    }

    if (prod.stock < requestedQty) {
      return res.status(400).json({ error: `Insufficient stock for product '${prod.title}'. Available stock: ${prod.stock}` });
    }

    // Recalculate based on discount price if available, otherwise regular price
    const finalPrice = prod.price_discount && prod.price_discount < prod.price ? prod.price_discount : prod.price;
    computedTotal += finalPrice * requestedQty;

    orderItems.push({
      product: prod,
      quantity: requestedQty,
    });
  }

  // Add standard shipping fee (matching frontend 200)
  computedTotal += 200;

  // Create Order in DB
  const newOrder = await order.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    phone: phone,
    address: address,
    postcode: postcode,
    city: city,
    currentDate,
    currentTime,
    status: 'pending',
    amount: computedTotal,
  });

  // Create individual order items & deduct stock
  for (const item of orderItems) {
    await items.create({
      orders_id: newOrder._id,
      product_id: item.product._id,
      quantity: item.quantity,
    });

    // Deduct stock from DB
    await Product.updateOne({ _id: item.product._id }, { $inc: { stock: -item.quantity } });
  }

  // Send Order Status Email
  const statusMsg = `Your order is pending. Thank you for shopping with us! Total amount: Rs. ${computedTotal}`;
  await sendMail(email, 'Order Status Update', statusMsg);

  res.json({ abc: 'Your order has been placed successfully.' });
});

// Find All Customer Orders (Admin only check applied in router)
const findOrders = asyncHandler(async (req, res) => {
  const data = await order.find().sort({ currentDate: -1, currentTime: -1 });
  res.json(data);
});

// Find Specific Customer Data
const findCustomer_Data = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const info = await order.findById(id);
  if (!info) {
    return res.status(404).json({ error: 'Order not found' });
  }
  // User can only view their own order (Admins bypass)
  if (req.user && req.user.role !== 'admin' && info.email !== req.user.email) {
    return res.status(403).json({ error: 'Unauthorized view' });
  }
  res.json(info);
});

// Find Customer Product List
const findCustomer_Product = asyncHandler(async (req, res) => {
  const id = req.params.id;
  
  // Auth check
  const orderDetails = await order.findById(id);
  if (!orderDetails) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (req.user && req.user.role !== 'admin' && orderDetails.email !== req.user.email) {
    return res.status(403).json({ error: 'Unauthorized view' });
  }

  const orderItems = await items.find({ orders_id: id });
  const finalOutPut = [];

  for (const item of orderItems) {
    const prod = await Product.findById(item.product_id);
    if (prod) {
      finalOutPut.push({
        ...prod.toObject(),
        quantity: item.quantity,
      });
    }
  }
  res.json(finalOutPut);
});

// User account order list (IDOR fixed: uses req.user.email)
const accountUserData = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const data = await order.find({ email }).sort({ currentDate: -1, currentTime: -1 });
  res.json(data);
});

// Empty Cart (IDOR fixed: uses req.user.email)
const emptyCart = asyncHandler(async (req, res) => {
  const email = req.user.email;
  await cart.deleteMany({ userEmail: email });
  res.json({ message: 'Cart emptied successfully' });
});

// Update Customer Status (Admin only check in router)
const customerStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  const ord = await order.findById(id);
  if (!ord) {
    return res.status(404).json({ error: 'Order not found' });
  }

  await order.updateOne({ _id: id }, { $set: { status } });
  const statusMsg = `Your order status has been updated to '${status}'. Thank you.`;
  await sendMail(ord.email, 'Order Status Update', statusMsg);

  res.json({ message: 'user Status updated successfully..' });
});

module.exports = {
  findOrders,
  final,
  changeQuantity,
  login,
  conformpassword,
  changeConformpassword,
  findCustomer_Data,
  customerStatus,
  findCustomer_Product,
  accountUserData,
  emptyCart,
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
  otpStore,
};
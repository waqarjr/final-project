const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  userEmail:  { type: String, required: true },
  quantity:   { type: Number, required: true, min: 1 },
});

const cart = mongoose.model('carts', Schema);
module.exports = cart;
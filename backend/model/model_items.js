const mongoose = require('mongoose');

const schema = mongoose.Schema({
  orders_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  quantity:   { type: Number, required: true, min: 1 },
});

const items = mongoose.model('items', schema);
module.exports = items;
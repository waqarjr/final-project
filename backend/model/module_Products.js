const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title:             { type: String, required: true },
  category:          { type: String, required: true },
  manufacturer:      { type: String, required: true },
  price:             { type: Number, required: true, min: 0 },
  price_discount:    { type: Number, default: 0, min: 0 },
  keywords:          String,
  stock:             { type: Number, required: true, min: 0 },
  short_description: String,
  long_description:  String,
  image:             String,
  status:            { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const Product = mongoose.model('products', schema);
module.exports = Product;
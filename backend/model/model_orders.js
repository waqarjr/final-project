const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstname:   { type: String, required: true },
  lastname:    { type: String, required: true },
  email:       { type: String, required: true },
  address:     { type: String, required: true },
  phone:       { type: String, required: true },
  postcode:    { type: String, required: true },
  city:        { type: String, required: true },
  currentDate: String,
  currentTime: String,
  status:      { type: String, default: 'pending' },
  amount:      Number, // Store as Number, not String
});

const orders = mongoose.model('orders', schema);
module.exports = orders;
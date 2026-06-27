const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  reviews:     { type: String, required: true },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  currentDate: String,
  currentTime: String,
  productId:   { type: String, required: true },
  firstName:   String,
  lastName:    String,
});

const review = mongoose.model('reviews', Schema);
module.exports = review;
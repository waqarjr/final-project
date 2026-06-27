const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  status: { type: String, default: 'active' },
  date:   String,
  image:  String,
});

const category = mongoose.model('categories', schema);
module.exports = category;

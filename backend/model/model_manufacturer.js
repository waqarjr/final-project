const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  status: { type: String, default: 'active' },
  image:  String,
  date:   String,
});

const manufacturer = mongoose.model('manufacture', schema);
module.exports = manufacturer;
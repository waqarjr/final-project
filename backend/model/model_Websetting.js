const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email:    String,
  phoneNo1: String,
  phoneNo2: String,
  address:  String,
});

const websetting = mongoose.model('websetting', schema);
module.exports = websetting;
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true },
  subject:   String,
  phone:     String,
  message:   { type: String, required: true },
});

const contactUs = mongoose.model('contactus', schema);
module.exports = contactUs;
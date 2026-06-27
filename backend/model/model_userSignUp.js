const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// mongoose.connect is called once in first.js — do NOT connect here

const schema = mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone:     { type: String, required: true },
  password:  { type: String, required: true },
});

schema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Signup = mongoose.model('Signup', schema);
module.exports = Signup;

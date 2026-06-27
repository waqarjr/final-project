const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// mongoose.connect is called once in first.js — do NOT connect here

const schema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

schema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Login = mongoose.model('Login', schema);
module.exports = Login;
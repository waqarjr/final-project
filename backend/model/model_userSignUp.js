const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/")

const chema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    password:String,
})
chema.pre('save',function(next){
  const password = bcrypt.hashSync(this.password,10);
  this.password = password;
  next();
})
const signup = mongoose.model("Signup",chema);
module.exports = signup;

 const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/")

const schema = mongoose.Schema({
    email:String,
    password:String,
});

schema.pre('save', function(next) {
    const password = bcrypt.hashSync(this.password,10);
    this.password = password;
    next(); 
    });

const Login = mongoose.model('Login',schema);
module.exports = Login;
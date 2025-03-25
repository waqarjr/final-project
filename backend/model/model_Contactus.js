const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/');
const schema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    subject:String,
    phone:String,
    message:String,
})
const contactUs = mongoose.model('contactus',schema);
module.exports = contactUs;
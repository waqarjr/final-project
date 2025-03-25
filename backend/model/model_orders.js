const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/');
const schema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    address:String,
    phone:String,
    postcode:String,
    city:String,
    currentDate:String,
    currentTime:String,
    status:String,
    amount:String
})
const orders = mongoose.model('orders',schema);
module.exports = orders;
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

const Schema = mongoose.Schema({
    product_id:String,
    name:String,
    Image:String,
    quantity:String,
    price:Number,
})
const cart = mongoose.model("carts",Schema);
module.exports = cart;
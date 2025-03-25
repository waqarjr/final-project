const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

const Schema = mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    userEmail:String,
    quantity:Number
})
const cart = mongoose.model("carts",Schema);
module.exports = cart;
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/');
const schema = mongoose.Schema({
    orders_id:String,
    product_id:String,
    quantity:String,
})
const items = mongoose.model('items',schema);
module.exports = items;
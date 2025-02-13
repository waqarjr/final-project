const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

 const schema = mongoose.Schema ({
    title:String,
    category:String,
    manufacturer:String,
    price:Number,
    price_discount:Number,
    keywords:String,
    stock:Number,
    short_description:String,
    long_description:String,
    image:String,
    status:String,
})

const category = mongoose.model('products',schema);

module.exports = category;
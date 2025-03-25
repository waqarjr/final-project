const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/');

const connect = mongoose.Schema({
    person_id:String,
    images:String,
})

const multi_products = mongoose.model('mul_products',connect);
module.exports = multi_products;
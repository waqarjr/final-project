const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

const Schema = mongoose.Schema({
    reviews:String,
    rating:Number,
    currentDate:String,
    currentTime:String,
    productId:String,
    firstName:String,
    lastName:String,
})
const review = mongoose.model("reviews",Schema);
module.exports = review;
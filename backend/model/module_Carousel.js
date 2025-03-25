const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

 const schema = mongoose.Schema ({
    name:String,
    title:String,
    status:String,
    image:String,
})

const carousel = mongoose.model('carousel',schema);

module.exports = carousel;

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

 const schema = mongoose.Schema ({
    name:String,
    status:String,
    date:String,
    image:String,
})

const category = mongoose.model('categories',schema);

module.exports = category;

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

 const schema = mongoose.Schema ({
    name:String,
    status:String,
    image:String,
    date:String,
})

const category = mongoose.model('manufacture',schema);

module.exports = category;
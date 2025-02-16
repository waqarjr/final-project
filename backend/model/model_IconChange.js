const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/");

const schema = mongoose.Schema ({
    icon:String,
})

const IconChange = mongoose.model('IconChanges',schema);
module.exports = IconChange;
    
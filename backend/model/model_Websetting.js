const mongoose =  require('mongoose');
mongoose.connect('mongodb+srv://waqarjr03:waqarjr03@project.itikg.mongodb.net/');

const schema =  mongoose.Schema({
    email:String,
    phoneNo1:String,
    phoneNo2:String,
    address:String
})

const websetting = mongoose.model('websetting',schema);

module.exports =  websetting;
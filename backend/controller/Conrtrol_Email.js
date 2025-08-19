const nodemailer = require("nodemailer");


var otp ;
const forgetpasswordemail  = (req,res)=>{
  const {email} = req.body;
  console.log(email)
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",port: 587,secure: false,               
      auth: { user: 'waqarjr03@gmail.com', pass: 'mrfxynsptfzbplxm'}
    });
    otp = Math.floor(Math.random()*1000000).toString();
    transporter.sendMail({
      from: 'waqarjr03@gmail.com',to: email,        
      subject: "Orders Recived",    
      text: `Your One-Time Password is: ${otp}. It expires in 5 minutes.`
      });
      }
module.exports = {forgetpasswordemail}
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   secure:true,
   host:'smtp.gmail.com',
   port:4000,
   auth:{
    user:'waqarjr03@gmail.com',
    pass:'gubebucdcuugzidg'
   } 
});

function sendMail(to , sub,mess){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:mess
    })
}

sendMail("waqarjr03@gmail.com","this is a waqar ","this is  a text message ",)

console.log('Email sent: 1');

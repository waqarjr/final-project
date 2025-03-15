const nodemailer = require("nodemailer");
const email  = ()=>{
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",      
        port: 587,
        secure: false,               
        auth: {
          user: 'waqarjr03@gmail.com',  
          pass: 'mrfxynsptfzbplxm' 
        }
      });     
      const mailOptions = {
        from: 'waqarjr03@gmail.com',            
        to: "waqarcute26@gmail.com",        
        subject: "Orders Recived",   
        text: `Your One-Time Password is: ${Math.floor(Math.random()*1000000).toString()}. It expires in 5 minutes.`
        };
      
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return console.error("Error sending email:"); 
        }
        console.log("Email sent successfully:");
      });
}
module.exports = {email}
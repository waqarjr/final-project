const Login = require('../model/model_login');
const bcrypt = require("bcrypt");
const sign = require('../model/model_userSignUp');
const contact = require('../model/model_Contactus');
const reviewsalpha = require('../model/model_reviews');
const cart = require('../model/model_cart');
const order = require('../model/model_orders');
const items = require('../model/model_items');
const singleImage = require('../model/module_Products');
const nodemailer = require('nodemailer');

const login = async(req,res)=>{

    const alpha = await Login.findOne();
    if(req.body.email == alpha.email){
        if(bcrypt.compareSync(req.body.password,alpha.password)){
            res.send({a:true});
        }else{
            res.send({message:"Password is incorrect"});
        }
    }else{
        res.send({message:"Email is incorrect"});
    }
}          
const conformpassword = async ( req , res)=>{
    
    const alpha = await Login.findOne();
    if(bcrypt.compareSync(req.body.password,alpha.password)){
        res.send({a:true});
    }else{
        res.send({message:"Password is incorrect"});
    }
}

const changeConformpassword = async (req,res)=>{
    const alpha = await Login.findById("67b71b9fa585494b731a5937");

    if(bcrypt.compareSync(req.body.oldpassword,alpha.password)){
        const newpassword = bcrypt.hashSync( req.body.newpassword,10);  
        await Login.updateOne({_id:"67b71b9fa585494b731a5937"},{$set:{password:newpassword}});
       res.send({a:true})
    }else{
        res.send({message:"Old Password is incorrect"});
    }
}

const signup = async (req,res)=>{
    const {firstname, lastname,email,phone,password} = req.body;
    const a =await sign.findOne({email:email});
    if (a == null){
         await sign.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            phone:phone,
            password:password,
        })
        res.send({sucess:"Login Sucessfully"})
    } else {
        res.send({message:"this email has been already used"})
    }
}

const accoutinfo = async(req,res)=>{
   const alpha = await sign.findOne({email:req.body.email})
   res.json(alpha);
}

const changePasswordUser = async(req,res)=>{
    const {email,currentpassword,newpassword} = req.body;
    const user = await sign.findOne({email:email});
   if(user != null ){
     if(bcrypt.compareSync(currentpassword,user.password)){
        const neee = bcrypt.hashSync(newpassword,10)
        await sign.updateOne({email:email},{$set:{password:neee}})
        res.json({cong:"Password has been updated sucessfully ..."})
     } else {
        res.json({message :"Incorrect password"})
     }
   }
}

const signin = async(req,res)=>{
    const {email , password} = req.body
    const user = await sign.findOne({ email: email });
    if(user){
        if(bcrypt.compareSync(password,user.password)){
           const neee = await sign.findOne({ email: email })
            res.json(neee);
        }else{
            res.send({password1:"your password is incorrect"}) 
        }
    } else{
        res.send({email1:"your email is incorrect"})
    } 
}

const signout = async(req,res)=>{
    const {email , signoutpassword} = req.body;
    const user = await sign.findOne({ email: email });
    if(user){
        if(bcrypt.compareSync(signoutpassword,user.password)){
             res.send({a:true});
         }else{
             res.send({password1:"your password is incorrect"}) 
         } 
    }
}

const contactus = async(req,res)=>{
    const { firstname,lastname,email,phone,subject,message }= req.body;
    await contact.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        phone:phone,
        subject:subject,
        message:message
    })
    res.send({contact:"Your information has been updated sucessfully..."})
} 

const review = async(req,res)=>{
    const { reviews,rating,currentDate,currentTime,productId ,firstName,lastName} = req.body;
    await reviewsalpha.create({
        reviews:reviews,
        rating:rating,
        currentDate:currentDate,
        currentTime:currentTime,
        productId:productId,
        firstName:firstName,
        lastName:lastName,
    })
    res.send({mess:"Thanks for givig  review..."})
}
const getReviews = async(req,res)=>{
    const id = req.params.id
    const alpha = await reviewsalpha.find({productId:id})
    res.json(alpha);
}

const cartitems = async(req,res)=>{
    const {email,productid,quantity} = req.body;
    const items =  await cart.findOne({product_id:productid,userEmail:email})
    if(items == null ){
        await cart.create({
            product_id: productid,
            userEmail: email,
            quantity:quantity,
        });
    }
    else {
       await cart.updateOne({product_id:productid,userEmail:email },{$inc:{quantity:quantity}})
    }
    res.json({message:"Item Added to cart Sucessfully"})
}

const cartPrducts = async(req,res)=>{
    const {email} = req.body;
    const cartItems = await cart.aggregate([
        { $match: { userEmail: email } },
        { $lookup: { from: "products", localField: "product_id", foreignField: "_id", as: "productDetails", },},
        { $unwind: "$productDetails" },
      ]);
      res.json(cartItems);
}

const deleteCart = async(req,res)=>{
    const id = req.params.id;
    await cart.findByIdAndDelete(id);
    res.json({a:true})
}

const changeQuantity = async(req,res)=>{
    const {email,id,quantity} = req.body;
    await cart.updateOne({_id:id,userEmail:email },{$set:{quantity:quantity}})
    res.json({message:"Item Quantity Updated Sucessfully"})
}

const final = async(req,res)=>{
    const {firstName,lastName,email,phone,address,postcode,city,productId,currentDate,currentTime,status,amount,productQty} = req.body;
  
    await order.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    phone: phone,
    address: address,
    postcode: postcode,
    city: city,
    currentDate:currentDate,
    currentTime:currentTime,
    status:status,
    amount:amount
})
const user = await order.find().sort({$natural:-1}).limit(1);
    const id = user[0]._id;
    if(productQty.length == 1){
        await items.create({
            orders_id:id,
            product_id:productId,
            quantity:productQty,
        })
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", port: 587, secure: false,               
            auth: { user: 'waqarjr03@gmail.com',pass: 'mrfxynsptfzbplxm'}
          });   
          transporter.sendMail({
            from: 'waqarjr03@gmail.com',to: `${email}`,subject: "Orders Status",   
            text: `your order is in a ${status} situation .Thanks for give us order `,
            });
        res.json({abc:"your order is taken sucessfully sucessfully"})
    } else {
        const userData = productId.map((path,index) => ({
            orders_id:id,
            product_id:path,
            quantity:productQty[index],
        }));
        await items.insertMany(userData);
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 587, secure: false,               
        auth: { user: 'waqarjr03@gmail.com',pass: 'mrfxynsptfzbplxm'}
        });   
        transporter.sendMail({
        from: 'waqarjr03@gmail.com',to: `${email}`,subject: "Orders Status",   
        text: `your order is in a ${status} situation .Thanks for give us order `,
        });
        res.json({abc:"your order is taken sucessfully sucessfully"}) 
    }
} 

const findOrders = async(req,res)=>{
   const data = await order.find();
    res.json(data) 
}

const findCustomer_Data = async(req,res)=>{
    const id = req.params.id;
    const Information = await order.findById(id); 
    res.json(Information)
}   
const findCustomer_Product = async(req,res)=>{
    const id = req.params.id;
    const Item = await items.find({ orders_id:id})
    const product = Item.map(pro => {
        return pro.product_id;
    })
    const proQuantity = Item.map(pro => {
        return pro.quantity;
    })
    const newProduct = await Promise.all(
        product.map(async pro =>{
            return await singleImage.findById(pro)
        })
    ) 
    const newproQuantity = proQuantity.map(item => ({quantity:item})) 
   const finalOutPut = newProduct.map((item,index)=>({
    ...item,
    ...newproQuantity[index]
   }))
    res.json(finalOutPut);
}

const accountUserData = async(req,res)=>{ 
    const {email} = req.body;
    const data = await order.find({email:email})
    res.json(data) 
}

const emptyCart = async(req,res)=>{
    const {email} = req.body;
    await cart.deleteMany({userEmail:email});
}

const customerStatus = async(req,res)=>{
    const {id,status} = req.body;
    const user = await order.findById(id);
      await order.updateOne({_id:id},{$set:{status:status}})
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",      
        port: 587,
        secure: false,               
        auth: {
          user: 'waqarjr03@gmail.com',  
          pass: 'mrfxynsptfzbplxm' 
        }
      });

      transporter.sendMail({
        from: 'waqarjr03@gmail.com',            
        to: `${user.email}`,        
        subject: "Orders Status",   
        text: `your order is in a ${status} situation .Thanks for give us order `,
        });
    res.json({message:"user Status updated sucessfully.."})
}   

module.exports = {findOrders,final,changeQuantity,login,conformpassword,changeConformpassword,findCustomer_Data,customerStatus,
    findCustomer_Product,accountUserData,emptyCart, signup,signin,contactus,review,getReviews,cartitems,cartPrducts,
    deleteCart,accoutinfo,changePasswordUser,signout};
const Login = require('../model/model_login');
const bcrypt = require("bcrypt");
const sign = require('../model/model_userSignUp');
const contact = require('../model/model_Contactus');
const reviewsalpha = require('../model/model_reviews');
const cart = require('../model/model_cart');
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
    res.send({mess:"your review has been send sucessfully..."})
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
}

module.exports = {login,conformpassword,changeConformpassword,signup,signin,contactus,review,getReviews,cartitems,cartPrducts,deleteCart,accoutinfo,changePasswordUser,signout};
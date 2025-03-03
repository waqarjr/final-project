const Login = require('../model/model_login');
const bcrypt = require("bcrypt");
const sign = require('../model/model_userSignUp');

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
    const a =await sign.find({email:email});
    console.log(a);
    if(a != []){
        //  await sign.create({
        //     firstname:firstname,
        //     lastname:lastname,
        //     email:email,
        //     phone:phone,
        //     password:password,
        // })
        res.send({message:"your message here"})
    } else {
        res.send({message:"this email has been already used"})
    }
}

module.exports = {login,conformpassword,changeConformpassword,signup};
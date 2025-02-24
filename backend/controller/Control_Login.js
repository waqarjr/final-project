const Login = require('../model/model_login');
const bcrypt = require("bcrypt");

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

module.exports = {login,conformpassword,changeConformpassword};
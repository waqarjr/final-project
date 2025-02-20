const Login = require('../model/model_login');
const bcrypt = require("bcrypt");

const login = async(req,res)=>{

    const alpha = await Login.findOne();
    if(req.body.email == alpha.email){
        if(bcrypt.compareSync(req.body.password,alpha.password)){
            res.send({ message:"Login Successfull"});
        }else{
            res.send({message:"Password is incorrect"});
        }
    }else{
        res.send({message:"Email is incorrect"});
    }

}


module.exports = login;
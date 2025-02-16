const websetting = require('../model/model_Websetting');

const read = async(req,res)=>{
const alpha =  await websetting.find();
res.json(alpha);
}

const update = async(req,res)=>{
const {email,phoneNo1,phoneNo2,address,id} = req.body;
    await websetting.updateOne({_id:id},{$set:{email:email,phoneNo1:phoneNo1,phoneNo2:phoneNo2,address:address}});
    res.json({message:"your data have been updated"});
}
module.exports = {update,read};
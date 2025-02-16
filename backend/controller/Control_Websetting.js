const websetting = require('../model/model_Websetting');
const Icon_change = require('../model/model_IconChange');
const fs = require('fs');
const path = require('path');
const read = async(req,res)=>{
const alpha =  await websetting.find();
res.json(alpha);
}

const update = async(req,res)=>{
const {email,phoneNo1,phoneNo2,address,id} = req.body;
    await websetting.updateOne({_id:id},{$set:{email:email,phoneNo1:phoneNo1,phoneNo2:phoneNo2,address:address}});
    res.json({message:"your data have been updated"});
}

const readIcon = async(req,res)=>{ 
    const alpha =  await Icon_change.find();
    res.json(alpha);
};


const updateIcon = async(req,res)=>{
    if(req.file != undefined){
        const imageRecord = await Icon_change.find();
        const filePath = path.join(__dirname, '../', imageRecord[0].icon.replace('http://localhost:4000/', ''));
        if(req.file.path){
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            await Icon_change.updateOne({_id:imageRecord[0]._id},{$set:{icon:`http://localhost:4000/${req.file.path}`}});
        }
        res.json({mes:"Your Data Have Been Updated"})
    }
};

module.exports = {update,read,updateIcon,readIcon};
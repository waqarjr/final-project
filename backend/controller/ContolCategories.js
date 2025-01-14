const category = require("../model/ModelCategories");
const path = require("path");
const fs = require("fs");

const creat_category = async (req,res)=>{
    const {name,status} = req.body;
    await category.create({
        name:name,
        status:status,
        image:`http://localhost:4000/${req.file.path}`,
    })
}

const read_category = async (req,res)=>{
    const read = await category.find();
    res.json(read);
}

const delete_category = async (req ,res)=>{
    const id = req.params.id;
    const imageRecord = await category.findById(id);
    const filepath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
    await category.findByIdAndDelete(id);
    res.json({message: 'Your image have been deleted'})
}

const read_update_category = async(req ,res)=>{
    const id = req.params.id;
    const fetch = await category.findById(id);
    res.json(fetch);
}

const update_category = async(req,res)=>{
    const id = req.params.id;
    const {name , status} = req.body;

    if(req.file != undefined){
    const imageRecord = await category.findById(id);
    const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(req.file.path){
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const {name,status} = req.body;
        await category.updateOne({_id:id},{$set:{name:name,image:`http://localhost:4000/${req.file.path}`,status:status}});
    }
    res.json({mes:"Your Data Have Been Updated"})
    }else {
    await category.updateOne({_id:id},{$set:{name:name,status:status}});
    res.json({mes:"Your Data Have Been Updated"})
    }
}

module.exports = {creat_category,read_category,delete_category,read_update_category,update_category};
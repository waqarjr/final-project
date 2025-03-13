const category = require("../model/ModelCategories");
const path = require("path");
const fs = require("fs");

const creat_category = async (req,res)=>{
    const {name,status,date} = req.body;
    await category.create({
        name:name,
        status:status,
        date:date,
        image:`http://localhost:4000/${req.file.path}`, 
    })
    res.send({message:"your data has been insertes sucessfully..."})
}

const read_category = async (req,res)=>{
    let read;
    const {status ,fromdate,todate, name } = req.body;
    if (name && name !== '') { 
        read = await category.find({ name: { $regex: name, $options: "i" } });
    } 
    else if (status && status !== '' && fromdate && fromdate !== '') {
        read = await category.find({ date: { $gte: fromdate, $lte: todate }, status: status });
    } else if (status === '' && fromdate !== '') {
        read = await category.find({ date: { $gte: fromdate, $lte: todate } });
    } else if (status !== '' && fromdate === '') {
        read = await category.find({ status: status });
    } else {
        read = await category.find(); 
    }
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

const select_update = async(req,res)=>{
const id = req.params.id;
const {status} =  req.body;
    await category.updateOne({_id:id},{$set:{status:status}})
    res.send({message:"Status updated sucessfully..."})
}



module.exports = {creat_category,read_category,delete_category,read_update_category,update_category,select_update};
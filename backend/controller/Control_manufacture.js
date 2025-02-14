const manufacture = require("../model/model_manufacturer");
const path = require("path");
const fs = require("fs");

const creat_manufacture = async (req,res)=>{
    const {name,status,date} = req.body;
    await manufacture.create({
        name:name,
        status:status,
        image:`http://localhost:4000/${req.file.path}`,
        date:date
    })
    res.send({message:"your data has been insertes sucessfully"})
}

const read_manufacture = async (req,res)=>{
    let read;
    const {status ,fromdate,todate, name } = req.body;
    if (name && name !== '') { 
        read = await manufacture.find({ name: { $regex: name, $options: "i" } });
    } 
    else if (status && status !== '' && fromdate && fromdate !== '') {
        read = await manufacture.find({ date: { $gte: fromdate, $lte: todate }, status: status });
    } else if (status === '' && fromdate !== '') {
        read = await manufacture.find({ date: { $gte: fromdate, $lte: todate } });
    } else if (status !== '' && fromdate === '') {
        read = await manufacture.find({ status: status });
    } else {
        read = await manufacture.find();
    }
    res.json(read);
}

const delete_manufacture = async (req ,res)=>{
    const id = req.params.id;
    const imageRecord = await manufacture.findById(id);
    const filepath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
    await manufacture.findByIdAndDelete(id);
    res.json({message: 'Your image have been deleted'})
}

const read_update_manufacture = async(req ,res)=>{
    const id = req.params.id;
    const fetch = await manufacture.findById(id);
    res.json(fetch);
}

const update_manufacture = async(req,res)=>{
    const id = req.params.id;
    const {name , status} = req.body;

    if(req.file != undefined){
    const imageRecord = await manufacture.findById(id);
    const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(req.file.path){
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const {name,status} = req.body;
        await manufacture.updateOne({_id:id},{$set:{name:name,image:`http://localhost:4000/${req.file.path}`,status:status}});
    }
    res.json({mes:"Your Data Have Been Updated"})
    }else {
    await manufacture.updateOne({_id:id},{$set:{name:name,status:status}});
    res.json({mes:"Your Data Have Been Updated"})
    }
}

const select_update = async(req,res)=>{
const id = req.params.id;
const {status} =  req.body;
    await manufacture.updateOne({_id:id},{$set:{status:status}})
  res.send({message:"Status updated sucessfully..."})
}

module.exports = {creat_manufacture,read_manufacture,delete_manufacture,read_update_manufacture,update_manufacture,select_update};
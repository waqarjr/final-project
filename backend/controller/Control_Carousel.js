const carousel = require("../model/module_Carousel");
const path = require("path");
const fs = require("fs");
const { title } = require("process");

const creat_carousel = async (req,res)=>{
    const {name,status,title} = req.body;
    await carousel.create({
        name:name,
        status:status,
        title:title,
        image:`http://localhost:4000/${req.file.path}`,
    })
    res.send({message:"Your data have been updated"});
}

const read_carousel = async (req,res)=>{
    const read = await carousel.find();
    res.json(read);
}

const delete_carousel = async (req ,res)=>{
    const id = req.params.id;
    const imageRecord = await carousel.findById(id);
    const filepath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(fs.existsSync(filepath)){
        fs.unlinkSync(filepath);
    }
    await carousel.findByIdAndDelete(id);
    res.json({message: 'Your image have been deleted'})
}

const read_update_carousel = async(req ,res)=>{
    const id = req.params.id;
    const fetch = await carousel.findById(id);
    res.json(fetch);
}

const update_carousel = async(req,res)=>{
    const id = req.params.id;
    const {name , status,title} = req.body;

    if(req.file != undefined){
    const imageRecord = await carousel.findById(id);
    const filePath = path.join(__dirname, '../', imageRecord.image.replace('http://localhost:4000/', ''));
    if(req.file.path){
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const {name,status} = req.body;
        await carousel.updateOne({_id:id},{$set:{name:name,image:`http://localhost:4000/${req.file.path}`,status:status,title:title}});
    }
    res.json({mes:"Your Data Have Been Updated"})
    }else {
    await carousel.updateOne({_id:id},{$set:{name:name,status:status,title:title}});
    res.json({mes:"Your Data Have Been Updated"})
    }
}

const select_update_carousel = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    await carousel.updateOne({ _id: id }, { $set: { status: status } });
    res.json({ message: "Status updated sucessfully..." }); 
};

module.exports = {creat_carousel,read_carousel,delete_carousel,read_update_carousel,update_carousel,select_update_carousel};
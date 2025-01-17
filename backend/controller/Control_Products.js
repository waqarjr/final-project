const singleImage = require('../model/module_Products');
const multipleImage = require('../model/module_Prod_Multiple');
const fs = require("fs");
const path = require("path");

const insertImage = async(req,res)=>{
    const {title ,category, manufacturer,vendor,price,price_discount,keywords,stock,short_description,long_description,status} = req.body;
    const image = req.files['image'] ? req.files['image'][0] : null;
    await singleImage.create({
        title:title,
        category:category,
        manufacturer:manufacturer,
        vendor:vendor,
        price:price,
        price_discount:price_discount,
        keywords:keywords,
        stock:stock,
        short_description:short_description,
        status:status,
        long_description:long_description,
        image: `http://localhost:4000/${image.path}`,
    })
    const single = await singleImage.find().sort({$natural:-1}).limit(1);
    const images = req.files['multipleImages'] ? req.files['multipleImages'] : [];
    const imagePaths = images.map((file) => `http://localhost:4000/${file.path}`);
    const id = single[0]._id;
    const imageData = imagePaths.map((path) => ({
        images: path,
        person_id:id,
      }));
      await multipleImage.insertMany(imageData);
      res.json({message:"Data Has Been Added..."});
}

const readData = async(req,res)=>{
     const a = await singleImage.find();
     res.json(a)
}
const update_Read_Data = async (req,res)=>{
    const id = req.params.id;
    const data =  await singleImage.findById(id);
    res.json(data);
}

const update_Mul_Images = async(req,res)=>{
    const alpha = await multipleImage.find();
    res.json(alpha);
}

const mul_Del_Image = async(req,res)=>{
    const id = req.params.id;
    const imageLocation = await multipleImage.findById(req.params.id)
    const filepath = path.join(__dirname , '../', imageLocation.images.replace('http://localhost:4000/',''));
    if(fs.existsSync(filepath)){
         fs.unlinkSync(filepath);
    }
     await multipleImage.findByIdAndDelete(id);
    res.json({message:"Your Image Have Been Deleted Sucessfully"}); 
}

const update = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const {title ,category, manufacturer,vendor,price,price_discount,keywords,stock,short_description,long_description,status} =req.body; 
    console.log(title ,category, manufacturer,vendor,price,price_discount,keywords,stock,short_description,long_description,status);
}

module.exports = {insertImage,readData,update_Read_Data,update_Mul_Images,mul_Del_Image,update};
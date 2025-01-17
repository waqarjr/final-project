const singleImage = require('../model/module_Products');
const multipleImage = require('../model/module_Prod_Multiple');

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
module.exports = {insertImage};
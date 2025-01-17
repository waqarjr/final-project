const express =  require("express");
const router = express.Router();
const multer = require("multer");

const {insertImage, readData, update_Read_Data, update_Mul_Images, mul_Del_Image, update} = require('../controller/Control_Products');

const insertData = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"Images/products")
    },
    filename:function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`;
        cd(null,file_name);
    }
})
const uplods = multer({storage:insertData})
router.post('/creat-product',uplods.fields([{name:'image'},{name:'multipleImages'}]),insertImage);

router.get('/read-product',readData)
router.get('/read-update-product/:id',update_Read_Data);
router.get('/read-mul-image-product',update_Mul_Images);
router.get('/del-mul-image-product/:id',mul_Del_Image);


const updateData = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,"Images/products")
    },
    filename:function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`;
        cd(null,file_name);
    }
})
const updateform = multer({storage:updateData})
router.post('/update-product/:id',updateform.fields([{name:'image'},{name:'multipleImages'}]),update);

module.exports = router;
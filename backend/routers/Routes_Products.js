const express =  require("express");
const router = express.Router();
const multer = require("multer");

const {insertImage} = require('../controller/Control_Products');

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
module.exports = router;
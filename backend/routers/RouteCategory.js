const  multer = require("multer");
const {read_update_category,creat_category,read_category,delete_category, update_category,select_update} = require("../controller/ContolCategories");

const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cd) {
        cd(null,"Images/categories");
    },
    filename: function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`;
        cd(null,file_name);
    }
})
const uploads = multer({storage:storage})
router.post('/creatcategories',uploads.single('image'),creat_category);

router.get('/readcategory',read_category);

router.post('/readcategory',read_category);

router.get('/deletecategory/:id',delete_category);

router.get('/readupdatecategory/:id',read_update_category);

const categories_update = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null,"Images/categories")
    },
    filename:function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`
        cd(null,file_name);
    }
})
const update = multer({storage:categories_update});

router.post('/updatecategory/:id',update.single('image'),update_category);

router.post('/selectupdate/:id',select_update);

module.exports = router;
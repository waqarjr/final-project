const  multer = require("multer");
const {read_update_manufacture,creat_manufacture,read_manufacture,delete_manufacture, update_manufacture,select_update} = require("../controller/Control_manufacture");

const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cd) {
        cd(null,"Images/manufactuer");
    },
    filename: function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`;
        cd(null,file_name);
    }
})
const uploads = multer({storage:storage})
router.post('/creatmanufacture',uploads.single('image'),creat_manufacture);

router.get('/readmanufacture',read_manufacture);
router.post('/readmanufacture',read_manufacture);

router.get('/deletemanufacture/:id',delete_manufacture);

router.get('/readupdatemanufacture/:id',read_update_manufacture);

const categories_update = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null,"Images/manufactuer")
    },
    filename:function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`
        cd(null,file_name);
    }
})
const update = multer({storage:categories_update});

router.post('/updatemanufacture/:id',update.single('image'),update_manufacture);

router.post('/selectupdate_manufacture/:id',select_update);
module.exports = router;
const express =  require("express");
const multer = require("multer");
const router = express.Router();

const {read_update_carousel,creat_carousel,read_carousel,delete_carousel, update_carousel,select_update_carousel} = require("../controller/Control_Carousel");


const storage = multer.diskStorage({
    destination: function(req,file,cd) {
        cd(null,"Images/carousel");
    },
    filename: function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`;
        cd(null,file_name);
    }
})
const uploads = multer({storage:storage})
router.post('/creatcarousel',uploads.single('image'),creat_carousel);

router.get('/readcarousel',read_carousel);

router.get('/deletecarousel/:id',delete_carousel);

router.get('/readupdatecarousel/:id',read_update_carousel);

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

router.post('/updatecarousel/:id',update.single('image'),update_carousel);

router.post('/selectupdatecarousel/:id',select_update_carousel);
module.exports = router;
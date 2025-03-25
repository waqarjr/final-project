const express = require("express");
const router = express.Router();
const multer =  require('multer');

const { update , read,updateIcon,readIcon} = require("../controller/Control_Websetting");

const uplode = multer();
router.post("/updatewebsetting", uplode.none(),update);
router.get("/readwebsetting", read);

const storage = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null,"Images/icon")
    },
    filename:function(req,file,cd){
        const file_name = `${Date.now()}-${file.originalname}`
        cd(null,file_name);
    }
})
const uplodIcon = multer({storage:storage});
router.post("/updateicon",uplodIcon.single('icon'),updateIcon);

router.get("/readicon",readIcon);
module.exports = router;
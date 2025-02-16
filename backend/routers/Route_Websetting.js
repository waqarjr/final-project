const express = require("express");
const router = express.Router();
const multer =  require('multer');

const { update , read} = require("../controller/Control_Websetting");

const uplode = multer();
router.post("/updatewebsetting", uplode.none(),update);
router.get("/readwebsetting", read);

module.exports = router;
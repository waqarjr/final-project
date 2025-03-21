const express =  require("express");
const multer = require("multer");
const router = express.Router();

const {forgetpasswordemail} = require('../controller/Conrtrol_Email');
const uplode = multer();
router.post('/forgetemail',uplode.single(null),forgetpasswordemail);

module.exports = router;

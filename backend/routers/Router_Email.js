const express =  require("express");
const multer = require("multer");
const router = express.Router();

const {email} = require('../controller/Conrtrol_Email');
const uplode = multer();
router.post('/email',uplode.single(null),email);

module.exports = router;

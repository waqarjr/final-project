const express = require('express');
const router = express.Router();
const multer = require('multer');

const {login,conformpassword,changeConformpassword} = require('../controller/Control_Login');

const uplode = multer();

router.post('/login',uplode.single(null),login);

router.post('/conformpassword',uplode.single(null),conformpassword);

router.post('/changepassword',uplode.single(null),changeConformpassword);
module.exports = router;
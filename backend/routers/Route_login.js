const express = require('express');
const router = express.Router();
const multer = require('multer');

const login = require('../controller/Control_Login');

const uplode = multer();

router.post('/login',uplode.single(null),login);

module.exports = router;
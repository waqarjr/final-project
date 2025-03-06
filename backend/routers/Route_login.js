const express = require('express');
const router = express.Router();
const multer = require('multer');

const {login,conformpassword,changeConformpassword, signup, signin, contactus, review, getReviews} = require('../controller/Control_Login');

const uplode = multer();

router.post('/login',uplode.single(null),login);

router.post('/conformpassword',uplode.single(null),conformpassword);

router.post('/changepassword',uplode.single(null),changeConformpassword);

router.post('/signup',uplode.single(null),signup);

router.post('/signin',uplode.single(null),signin);

router.post('/contactus',uplode.single(null),contactus);

router.post('/reviews',uplode.single(null),review);

router.get('/getreviews/:id',uplode.single(null),getReviews);

module.exports = router;
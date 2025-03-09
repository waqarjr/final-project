const express = require('express');
const router = express.Router();
const multer = require('multer');

const {login,conformpassword,changeConformpassword, signup, signin, contactus, review, getReviews, cartitems, cartPrducts, deleteCart, accoutinfo, changePasswordUser, signout} = require('../controller/Control_Login');

const uplode = multer();

router.post('/login',uplode.single(null),login);

router.post('/conformpassword',uplode.single(null),conformpassword);

router.post('/changepassword',uplode.single(null),changeConformpassword);

router.post('/signup',uplode.single(null),signup);

router.post('/signin',uplode.single(null),signin);

router.post('/contactus',uplode.single(null),contactus);

router.post('/reviews',uplode.single(null),review);

router.get('/getreviews/:id',uplode.single(null),getReviews);

router.post('/cartitems',uplode.single(null),cartitems);

router.post('/cart-product',uplode.single(null),cartPrducts);

router.post('/del-cart/:id',uplode.single(null),deleteCart);

router.post('/account-info',uplode.single(null),accoutinfo);

router.post('/change-password',uplode.single(null),changePasswordUser);

router.post('/signout',uplode.single(null),signout);
module.exports = router;
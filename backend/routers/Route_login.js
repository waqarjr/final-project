const express = require('express');
const router = express.Router();
const multer = require('multer');

const {login,conformpassword,changeConformpassword, signup, signin, contactus, review, getReviews, cartitems, 
     cartPrducts, deleteCart, accoutinfo, changePasswordUser, signout, changeQuantity, final, findOrders, findCustomer_Data, 
     findCustomer_Product, accountUserData, emptyCart,
     customerStatus} = require('../controller/Control_Login');

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

router.post('/chnagequantity',uplode.single(null),changeQuantity);

router.post('/finalorder',uplode.single(null),final);

router.get('/customerorder',uplode.single(null),findOrders);

router.post('/siglecus-data/:id',uplode.single(null),findCustomer_Data);

router.post('/singcus-product/:id',uplode.single(null),findCustomer_Product);

router.post('/account-userdata',uplode.single(null),accountUserData);

router.post('/empty-cart',uplode.single(null),emptyCart);

router.post('/customer-status',uplode.single(null),customerStatus);

module.exports = router;
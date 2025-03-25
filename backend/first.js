const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const category = require("./routers/RouteCategory");
const manufacture = require("./routers/Route_manufacture");
const products = require('./routers/Routes_Products');
const carousel = require("./routers/Route_Carousel");
const websetting = require('./routers/Route_Websetting');
const login = require("./routers/Route_login");
const email = require('./routers/Router_Email');

app.use('/',manufacture);
app.use('/',category);
app.use('/',products);
app.use('/',carousel);
app.use('/',websetting);
app.use('/',login);
app.use('/',email);
app.use('/images', express.static('images'));

app.listen(4000);
const express = require("express");
const category = require("./routers/RouteCategory");
const manufacture = require("./routers/Route_manufacture");
const products = require('./routers/Routes_Products');


const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',manufacture);
app.use('/',category);
app.use('/',products);

app.use('/images', express.static('images'));

app.listen(4000);
const express = require("express");
const category = require("./routers/RouteCategory");
const manufacture = require("./routers/Route_manufacture");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use('/',manufacture);
app.use('/',category);
app.use('/images', express.static('images'));

app.listen(4000);
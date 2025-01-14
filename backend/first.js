const express = require("express");
const router = require("./routers/RouteCategory");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/',router);
app.use('/images', express.static('images'));
app.listen(4000);
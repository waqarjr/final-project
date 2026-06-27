const mongoose = require("mongoose");

// mongoose.connect is called once in first.js — do NOT connect here

const connect = mongoose.Schema({
    person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    images:    String,
})

const multi_products = mongoose.model('mul_products', connect);
module.exports = multi_products;
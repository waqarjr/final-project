const mongoose = require("mongoose");

// mongoose.connect is called once in first.js — do NOT connect here

const schema = mongoose.Schema ({
    name:   { type: String, required: true },
    title:  String,
    status: { type: String, default: 'active' },
    image:  String,
})

const carousel = mongoose.model('carousel', schema);

module.exports = carousel;

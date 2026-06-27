const mongoose = require("mongoose");

// mongoose.connect is called once in first.js — do NOT connect here

const schema = mongoose.Schema ({
    icon: String,
})

const IconChange = mongoose.model('IconChanges', schema);
module.exports = IconChange;
const mongoose = require("mongoose");

const table = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    occupied: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("tables", table)

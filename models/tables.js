const mongoose = require("mongoose");

const table = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    qr_code: {
        type: String,
        required: true
    },
    occupied: {
        type: Boolean,
        default: false
    }, 
    printed: {
        type: Boolean,
        default: false
    },
    orders: {
        type: []
    }
})

module.exports = mongoose.model("tables", table);

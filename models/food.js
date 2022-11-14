const mongoose = require('mongoose');

const foods = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Foods', foods)

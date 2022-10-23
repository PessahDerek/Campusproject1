const mongoose = require('mongoose');

const foods = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    unit: {
        type: String
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
    flavors: {
        type: []
    },
    prices: {
        type: []
    }
})

module.exports = mongoose.model('Foods', foods)
const mongoose = require('mongoose')

const newOrder = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    }, 
    tableNumber: {
        type: String,
        required: true
    },
    orders: {
        type: [],
        required: true
    }
})

module.exports = mongoose.model('orders', newOrder)
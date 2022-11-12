const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('customer', customer);

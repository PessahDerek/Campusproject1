const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    username: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('customer', customer);

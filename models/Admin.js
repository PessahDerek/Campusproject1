const mongoose = require('mongoose')

let newAdmin = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    accessRight: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('admins', newAdmin);

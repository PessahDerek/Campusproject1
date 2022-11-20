const mongoose = require('mongoose')

const newRequest = mongoose.Schema({
    customer: {
        type: String,
    },
    tableNumber: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    receivedTime: {
        type: Date,
        default: ()=>{
            return Date.now()
        }
    },
    customerSorted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('requests', newRequest)
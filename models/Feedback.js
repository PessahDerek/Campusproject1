const mongoose = require('mongoose')

const newFeedback = mongoose.Schema({
    feedback: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Feedbacks', newFeedback)

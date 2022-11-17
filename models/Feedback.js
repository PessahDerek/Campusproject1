const mongoose = require('mongoose')


let newFeedback = new mongoose.Schema({
    food: {
        type: String
    },
    feedback: {
        type: []
    },
    five: {
        type: Number,
        default: 0
    },
    four: {
        type: Number,
        default: 0
    },
    three: {
        type: Number,
        default: 0
    },
    two: {
        type: Number,
        default: 0
    },
    one: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: function (){
            let tot = ((1*this.one)+(2 * this.two) + (3 * this.three) + (4 * this.four) + (5 * this.five));
            let R = this.one + this.two + this.three + this.four + this.five
            return tot / R; 
        }
    }
})

module.exports = mongoose.model('feedback', newFeedback);

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
        get: function (){
            let tot = ((1*this.one)+(2 * this.two) + (3 * this.three) + (4 * this.four) + (5 * this.five));
            let R = this.one + this.two + this.three + this.four + this.five;
            if (isNaN(tot / R)){
                console.log(tot/R)
                return 0; 
            } 
            return tot / R
        }
    }
})

newFeedback.pre('findOneAndUpdate', async(docs, err)=>{
    let total = ((1*docs.one)+(2 * docs.two) + (3 * docs.three) + (4 * docs.four) + (5 * docs.five));
    let R = docs.one + docs.two + docs.three + docs.four + docs.five
    let rating = total/R
    console.log(rating)
})


module.exports = mongoose.model('foodFeedBack', newFeedback);

const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const dotenv = require('dotenv').config();
const qr = require('qrcode');
const Feedback = require('../models/Feedback');


module.exports = async function new_feedback(foodId){
    let newFeedback = Feedback({
        food: foodId
    })
    await newFeedback.save()
    .then(res=>{
        console.log(res)
        return true
    })
    .catch(err=>{
        return false
    })
}

module.exports = async function update_rate(foodId){
    let food = await Feedback.findOne({food: foodId})
    console.log("this feedback: ", food)
    if(food === null) return false
    let tot = ((1*food.one)+(2 * food.two) + (3 * food.three) + (4 * food.four) + (5 * food.five));
    let R = food.one + food.two + food.three + food.four + food.five;

    await Feedback.findOneAndUpdate({food: foodId}, {rating: tot/R})
    .then(resp=>{
        return true
    })
    .catch(err=>{
        return false
    });
}

module.exports = async function upload_image(image, func){
    let url;
    const callback = (err, resp) =>{
        if (err){
            console.log(err)
            return {err: true, message: err}
        }

        url = resp.url;
        func(url)
    }

    try {
        cloudinary.uploader.upload_stream({
            resource_type: "image", 
            public_id: `${Date.now() + image.originalname}`
        }, callback).end(image.buffer)
    } catch (error) {
        return {err: true, message: error};
    }
    // await till url is not undefined
}

module.exports = async function generateQRcode(number){
    let data = {
        tableNumber: number
    }

    try {
        return new Promise((resolve, reject) => {
            let strData = JSON.stringify(data);
            qr.toDataURL(strData, {type: 'terminal'}, function (err, code){
                if(err) return reject(false);
                return resolve(code);
            })
        })
    } catch (error) {
        
    }
    
}
 
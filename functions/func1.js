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
        return true
    })
    .catch(err=>{
        return false
    })
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
 
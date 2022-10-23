const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const dotenv = require('dotenv').config();

module.exports = async function upload_image(image, func){
    let url;
    const callback = async(err, resp) =>{
        if (err){
            console.log(err)
            return {err: true, message: err}
        }
        console.log('here')
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
const adminserver = require('express').Router();
const upload = require('../multer/multer')
const upload_image = require('../functions/func1');
const generateQRcode = require('../functions/func1');
const food = require('../models/food');
const tables = require('../models/tables');
const Admin = require('../models/Admin');

// define cloudinary
const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const dotenv = require('dotenv').config();

adminserver.post('/admincreateaccount', async(req, res)=>{
    if(req.body.username && req.body.password && req.body.phone){
        let newUser = new Admin({
            userName: req.body.username,
            phone: req.body.phone,
            password: req.body.password
        })
        await newUser.save()
        .then(resp=>{
            return res.send({err: false, adminId: resp._id})
        }, err=>{
            return res.send({err: true, message: err.message})
        })
        .catch(err=>{
            return res.send({err: true, message: err.message})
        })
        return
    }
    return res.send({err: true, message: "Empty Input"});
})

adminserver.post('/adminsignin', async(req, res)=>{
    console.log(req.body)
    if(req.body.username && req.body.password){
        let isAdmin = await Admin.findOne({userName: req.body.username})
        if(isAdmin === null) return res.send({err: true, message: 'Account does not exist'})
        if(isAdmin.password !== req.body.password)return res.send({err: true, message: "Mismatching Credentials"})
        return res.send({err: false, adminId: isAdmin._id})
    }
    return res.send({err: true, message: "Empty Input"})
})

adminserver.post('/addfood', upload.single('image'), async(req, res)=>{
    let image = req.file;
    let body = req.body;

    let url;
    const callback = (err, resp) =>{
        console.log('err')
        if (err){
            console.log(err)
            return res.send({err: true, message: err.message}) 
        }

        url = resp.url;
        let newFood = new food({
            image: url,
            category: body.category,
            description: body.description,
            title: body.title,
            price: body.price
        })
        
        try {
            let save = newFood.save()
            save.then(resp =>{
                return res.send({err: false, message: `${body.title} has been added`})
            }, err=>{
                return res.send({err: true, message: `${err.message}`})
            })
            .catch(err=>{
                return res.send({err: true, message: err.message})
            })
        } catch (error) {
            return res.send({err: true, message: `${error.message}`})
        }
    }

    try {
        let x = cloudinary.uploader.upload_stream({
            resource_type: "image", 
            public_id: `${Date.now() + image.originalname}`
        }, callback).end(image.buffer)
    } catch (error) {
        console.log(error.message)
        return res.send({err: true, message: error.message});
    }

})


adminserver.post('/registertables', async(req, res)=>{
    //let qr_code; 
    let errMsg;
    let generalError = false
    let currTables = await tables.find();
    let constCounter = currTables.length;
    console.log(constCounter + Number(req.body.count))
    
    for (let i = currTables.length+1; i <= Number(constCounter) + Number(req.body.count); i++){
        
        await generateQRcode(i)
        .then(resp=>{
            if (resp === false){
                res.send({err: true, message: "Error generating qr code"});
                return;
            }
            // console.log(res)
            if (typeof(resp) !== 'undefined'){
                let newtables = new tables({
                    qr_code: resp,
                    number: i,
                    order: [],
                })
                let newt = newtables.save()
                newt.then(resp=>{
                    console.log("added...")
                    // pass
                }, err=>{
                    // res.send({err: true, message: err.message})
                    errMsg = err.message;
                    generalError = true;
                    return
                })
                .catch(err=>{
                    // res.send({err: true, message: err.message})
                    errMsg = err.message;
                    generalError = true
                    return;
                })
            }
        });
    }
    if (generalError){
        res.send({err: true, message: errMsg});
        return
    }
    res.send({err:false, message: `${req.body.count} have been added`})
})

adminserver.get('/gettablelist', async(req, res)=>{
    let response = await tables.find();
    if (typeof(response) === 'object') res.send(response);
})

adminserver.delete('/deletetable', async(req, res)=>{
    let id = req.body
    tables.findOneAndRemove(id, (err, param)=>{
        if (!err){
            res.send("Table ", param, " deleted!")
            console.log("done")
            return
        }
        res.send("Could not delete table ", param)
    })
})

adminserver.post('/editfood', async(req, res)=>{
    let edit = req.body
    food.updateOne({_id: edit.id}, {title: edit.title, description: edit.description, price: edit.price}, (err, docs)=>{
        if(err){
            return res.send({err: true, message: 'Could not Edit'})
        }
        console.log(docs)
        return res.send({err: false, message: "Edit Successfully"})
    } )
})

module.exports = adminserver

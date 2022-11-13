const adminserver = require('express').Router();
const upload = require('../multer/multer')
const upload_image = require('../functions/func1');
const generateQRcode = require('../functions/func1');
const food = require('../models/food');
const tables = require('../models/tables');
const Admin = require('../models/Admin');

adminserver.post('/admincreateaccount', async(req, res)=>{
    if(req.body.userName && req.body.password && req.body.phone){
        let newUser = new Admin({
            userName: req.body.userName,
            phone: req.body.phone,
            password: req.body.password
        })
        await newUser.save()
        .then(res=>{
            return res.send({err: false, adminId: res._id})
        }, err=>{
            return res.send({err: true, message: err.message})
        })
        .catch(err=>{
            return res.send({err: true, message: err.message})
        })
    }
    return res.send({err: true, message: "Empty Input"});
})

adminserver.post('/adminsignin', async(req, res)=>{
    if(req.body.userName && req.body.password){
        let isAdmin = await Admin.findOne({userName: req.body.userName})
        if(isAdmin === null) return res.send({err: true, message: 'Account does not exist'})
        if(isAdmin.password !== req.body.password)return res.send({err: true, message: "Mismatching Credentials"})
        return res.send({err: false, adminId: isAdmin._id})
    }
    return res.send({err: true, message: "Empty Input"})
})

adminserver.post('/addfood', upload.single('image'), async(req, res)=>{
    let image = req.file;
    let body = req.body;


    async function reset_resp(url){
        if (!url.err){
            console.log("saving to db")
            let newFood = new food({
                image: url,
                category: body.category,
                unit: body.unit,
                title: body.title,
                flavors: JSON.parse(body.flavors),
                prices: JSON.parse(body.prices)
            })
            
            try {
                await newFood.save()
                .then(res =>{
                    console.log("no err in saving")
                    res.send({err: false, message: `${body.title} has been added`})
                    return 0
                }, err=>{
                    res.send({err: true, message: `${err.message}`})
                })
            } catch (error) {
                res.send({err: true, message: `${error.message}`})
            }
        }else{
            console.log("err...")
            res.send(url)
        }
    }

    let resp = await upload_image(image, reset_resp)
})


adminserver.post('/registertables', async(req, res)=>{
    let qr_code; 
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

module.exports = adminserver

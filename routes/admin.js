const adminserver = require('express').Router();
const upload = require('../multer/multer')
const upload_image = require('../functions/func1');
const food = require('../models/food');
const tables = require('../models/tables');


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
    // check if tables are available
    let tableList = await tables.find()
    let response, isError = false;
    let boundary = tableList.length + Number(req.body.count)
    
    for (let i = tableList.length; i <= boundary; i++){
        let newTable = new tables({
            number: i+1,
            occupied: false
        })
        let addedTable = newTable.save();
        addedTable.then(res=>{
            response = "Table added"
        }, err=>{
            response = err.message
            isError = true
        })
        .catch(err=>{
            response=err.message;
            isError = true
        })
    }
    res.send({err: isError, message: response})
})

adminserver.get('/gettablelist', async(req, res)=>{
    let response = await tables.find();
    res.send(response);
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

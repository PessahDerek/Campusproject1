const client = require('express').Router();
const customer = require('../models/customer');
const foods = require('../models/food')

client.post('/createaccount', async(req, res)=>{
    if (req.body.username && (req.body.password.length > 4) && req.body.phone){
        let newCustomer = new customer({
            username: req.body.username,
            phone: req.body.phone,
            password: req.body.password
        })
        let saveCustomer = newCustomer.save();
        saveCustomer
        .then(resp=>{
            res.send({userId: resp._id})
        }, err=>{
            res.send({err: true, message: 'A little problem on our side, try again'})
        })
        .catch(err=>{
            res.send({err: true, message: 'Could not create account, try again'})
        })
    }
})

client.get('/gettable', async(req, res)=>{
    console.log(req.headers)
    res.send({id: 1738})
})

client.get('/clientfoods', async(req, res)=>{
    let foodList = await foods.find();
    res.send(foodList);
})


module.exports = client;

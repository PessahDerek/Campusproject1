const client = require('express').Router();
const customer = require('../models/customer');
const foods = require('../models/food');
const orders = require('../models/Orders')

client.post('/createaccount', async(req, res)=>{
    console.log(req.body)
    if (req.body.username && req.body.phone && req.body.password){
        if (req.body.password.length < 4) return res.send({err: true, message: "short password"})
        if (req.body.phone.length < 10) return res.send({err: true, message: "Enter Valid Phone Number"})
        let newCustomer = new customer({
            username: req.body.username,
            phone: req.body.phone,
            password: req.body.password
        })
        let saveCustomer = newCustomer.save();
        saveCustomer
        .then(resp=>{
            res.send({err: false, userId: resp._id})
        }, err=>{
            if(err.code === 11000) return res.send({err: true, message: "Account Already Exists"})
            res.send({err: true, message: 'A little problem on our side, try again'})
        })
        .catch(err=>{
            res.send({err: true, message: 'Could not create account, try again'})
        })
        return
    }
    res.send({err: true, message: "Empty Input"})
})

client.get('/gettable', async(req, res)=>{
    console.log(req.headers)
    res.send({id: 1738})
})

client.get('/clientfoods', async(req, res)=>{
    let foodList = await foods.find();
    res.send(foodList);
})

client.post('/placeorder', async(req, res)=>{
    let request = req.body
    console.log(request)
    return
    let newOrder = new orders({
        customer: request.userId,
        tableNumber: request.tableNumber,
        orders: JSON.parse(request.foods) //bears comments
    })
    try {
        await newOrder.save()
        .then(res=>{
            console.log(res)
        }, err=>console.log('minor err: ', err))
        .catch(err=>{
            console.log('major err: ', err)
        })
    } catch (error) {
        
    }
})

module.exports = client;

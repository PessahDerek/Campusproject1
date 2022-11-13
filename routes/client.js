const client = require('express').Router();
const customer = require('../models/customer');
const foods = require('../models/food');
const orders = require('../models/Orders');
const tables = require('../models/tables');

client.post('/createaccount', async(req, res)=>{
    console.log(req.body)
    if (req.body.username && req.body.phone && req.body.password){
        if (req.body.password.length < 4) return res.send({err: true, message: "short password"})
        if (String(req.body.phone.length) < 10) return res.send({err: true, message: "Enter Valid Phone Number"})
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

client.post('/login', async(req, res)=>{
    if (req.body.username && req.body.password){
        let isUser = await customer.findOne({username: req.body.username})
        if(isUser === null) return res.send({err: true, message: "Account Doesn't Exist"})
        if(String(isUser.password) === String(req.body.password)) return res.send({err: false, userId: isUser._id})
        return res.send({err: true, message: "Mismatching Details"})
    }
    res.send({err: true, message: "this Empty Input"})
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
    let newOrder = new orders({
        customer: request.userId,
        tableNumber: 14,
        orders: request.orders
    })
    try {
        await newOrder.save()
        .then(resp=>{
            // add to table
            tables.updateOne({number: 1}, {$set: {orders: resp._id}}, err=>{
                if(err){
                    return console.log("xxx", err.message)
                }
                return res.send({err: false, message: "Order Sent, Wait to be served", orderId: resp._id})
            })
            
        }, err=>{
            console.log(Object.keys(err))
            console.log('minor err: ', err.message)
            return res.send({err: true, message: "Order Could not be sent, We'll send a waiter"})
        })
        .catch(err=>{
            console.log('major err: ', err)
            return res.send({err: true, message: "Order Could not be sent, we'll send a waiter"})
        })
    } catch (error) {
        
    }
})

module.exports = client;

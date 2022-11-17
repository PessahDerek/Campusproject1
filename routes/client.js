const client = require('express').Router();
const customer = require('../models/customer');
const Feedback = require('../models/Feedback');
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
        orders: request.orders,
        customerTotal: request.total
    })
    try {
        await newOrder.save()
        .then(resp=>{
            // add to table
            tables.updateOne({number: 1}, {$set: {orders: resp._id}}, err=>{
                if(err){
                    return console.log("xxx", err.message)
                }
                console.log("h1h1h1")
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
        res.send({err: true, message: error.message})
    }
})

client.post('/myorders', async(req, res)=>{
    let myorders = await orders.find({customer: req.body.userId})
    console.log(myorders)
    if(myorders !== null){
        return res.send({err: false, orders: myorders})
    }
    return res.send({err: true, message: "You don't have any orders"})
})

client.post('/customerfeedback', async(req, res)=>{
    let findFood = await Feedback.find({food: req.body.foodId})
    
    async function update_food_rating(){
        let getFoodRating = await Feedback.find({food: req.body.foodId})
        await foods.findByIdAndUpdate(req.body.foodId, {rating: getFoodRating.rating})
        .then(resp=>{
            return res.send({err: false, message: "Thank you for your feedback"})
        })
        .catch(err=>{
            console.log(err.message)
            // should concern the admin
        })
    }
    async function update(){
        switch(req.body.stars){
            case 1: {
                await Feedback.updateOne({_id: req.body.foodId}, {$inc: {one: 1}, $push: {feedback: req.body.feedback}})
                .then(resp=>{
                    if (resp.acknowledged) return update_food_rating()
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
            case 2: {
                await Feedback.updateOne({_id: req.body.foodId}, {$inc: {two: 1}, $push: {feedback: req.body}})
                .then(resp=>{
                    if(resp.acknowledged) return update_food_rating()
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
            case 3: {
                await Feedback.updateOne({_id: req.body.foodId}, {$inc: {three: 1}, $push: {feedback: req.body.feedback}})
                .then(resp=>{
                    if(resp.acknowledged) return update_food_rating()
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
            case 4: {
                await Feedback.updateOne({_id: req.body.foodId}, {$inc: {four: 1}, $push: {feedback: req.body.feedback}})
                .then(resp=>{
                    if(resp.acknowledged) return update_food_rating()
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
            case 5: {
                await Feedback.updateOne({_id: req.body.foodId}, {$inc: {five: 1}, $push: {feedback: req.body.feedback}})
                .then(resp=>{
                    if(resp.acknowledged) return update_food_rating()
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
        }
    }
    if (findFood === null){
        let newFeedback = Feedback({
            food: foodId
        })
        await newFeedback.save()
        .then(resp=>{
            console.log(resp)
            update()
        })
        .catch(err=>{
            return false
        })
    }else{
        console.log("exists")
        return update()
    }

})

module.exports = client;

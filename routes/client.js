const client = require('express').Router();
const customer = require('../models/customer');
const Feedback = require('../models/Feedback');
const foods = require('../models/food');
const orders = require('../models/Orders');
const tables = require('../models/tables');
const update_rate = require('../functions/func1');
const Request = require('../models/Request');

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
        customerTotal: request.cost
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
        res.send({err: true, message: error.message})
    }
})

client.post('/myorders', async(req, res)=>{
    let myorders = await orders.find({customer: req.body.userId})
    if(myorders !== null){
        return res.send({err: false, orders: myorders})
    }
    return res.send({err: true, message: "You don't have any orders"})
})

client.post('/customerfeedback', async(req, res)=>{
    let findFood = await Feedback.findOne({food: req.body.foodId})
    
    async function update_food_rating(){
        
        let x = await update_rate(req.body.foodId)
        console.log("this_x: ", x)
        let getFoodRating = await Feedback.findOne({food: req.body.foodId})
        await foods.findByIdAndUpdate(req.body.foodId, { rating: getFoodRating.rating})
        .then(resp=>{
            console.log("yzyz: ", resp)
            return res.send({err: false, message: "Thank you for your feedback"})
        })
        .catch(err=>{
            console.log(err.message)
            // should concern the admin
        })
    }
    async function update(){
        console.log('on update', req.body.stars)
        switch(req.body.stars){
            case 1: {
                Feedback.findOneAndUpdate({food: req.body.foodId}, {$inc: {one: 1}, $push: {feedback: req.body.feedback}}, (err, docs)=>{
                    if(err){
                        console.log(err)
                        return res.send({err: true, message: "Error recording feedback, try again later"})
                    }
                    console.log('no wahala')
                    return update_food_rating()
                })
                break;
            }
            case 2: {
                Feedback.findOneAndUpdate({food: req.body.foodId}, {$inc: {two: 1}, $push: {feedback: req.body}}, (err, docs)=>{
                    if(err){
                        console.log(err)
                        return res.send({err: true, message: "Error recording feedback, try again later"})
                    }
                    console.log('no wahala')
                    return update_food_rating()
                })
                break;
            }
            case 3: {
                Feedback.findOneAndUpdate({food: req.body.foodId}, {$inc: {three: 1}, $push: {feedback: req.body.feedback}}, (err, docs)=>{
                    if(err){
                        console.log(err)
                        return res.send({err: true, message: "Error recording feedback, try again later"})
                    }
                    console.log('no wahala')
                    return update_food_rating()
                })
                break;
            }
            case 4: {
                await Feedback.findOneAndUpdate({food: req.body.foodId}, {$inc: {four: 1}, $push: {feedback: req.body.feedback}})
                .then(resp=>{
                    console.log('no wahala', resp)
                    return update_food_rating()
                }, err=>console.log("is minor: ", err.message))
                .catch(err=>{
                    console.log(err)
                    return res.send({err: true, message: "Error recording feedback, try again later"})
                })
                break;
            }
            case 5: {
                Feedback.findOneAndUpdate({food: req.body.foodId}, {$inc: {five: 1}, $push: {feedback: req.body.feedback}}, (err, docs)=>{
                    if(err){
                        console.log(err)
                        return res.send({err: true, message: "Error recording feedback, try again later"})
                    }
                    return update_food_rating()
                })
                break;
            }
        }
    }

    if (findFood === null){
        let newFeedback = Feedback({
            food: req.body.foodId
        })
        await newFeedback.save()
        .then(resp=>{
            console.log("step 1", resp)
            update()
        }, err=>{
            console.log("minor kiasi", err.message)
        })
        .catch(err=>{
            return false
        })
    }else{
        return update()
    }

})


client.post('/custrequest', async(req, res)=>{
    let newRequest = new Request({
        customer: req.body.customer,
        tableNumber: req.body.tableNumber,
        message: req.body.message
    })
    await newRequest.save()
    .then(resp=>{
        return res.send({err: false, sent: true})
    }, err=>res.send({err: true, message: "Error, try again"}))
    .catch(err=>{
        res.send({err: true, message: "Couldn't Send request try again"})
    })
    
})

module.exports = client;

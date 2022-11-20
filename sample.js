const express = require('express').Router()

express.post('/update', async(req, res)=>{
    async function updateTable1(){
        await table1.findOneAndUpdate({_id: req.body.id1}, {record1: req.body.record1})
        .then(resp=>{
            // continue to update the second table
            updateTable2()
        })
        .catch(err=>{
            // break from the operation incase of error
            return
        })
    }
    async function updateTable2(){
        await table2.findOneAndUpdate({_id: req.body.id2}, {record2: req.body.record2})
        .then(resp=>{
            // continue to update the second table
            updateTable3()
        })
        .catch(err=>{
            // break from the operation incase of error
            return
        })
    }
    async function updateTable3(){
        await table3.findOneAndUpdate({_id: req.body.id3}, {record1: req.body.record1})
        .then(resp=>{
            // continue to update the second table
            return res.send({message: "Successful"}).statusCode(200)
        })
        .catch(err=>{
            // break from the operation incase of error
            return
        })
    }
})

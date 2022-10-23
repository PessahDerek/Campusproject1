
const cors = require('cors')
cors();
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');
const admApi = require('./routes/admin');
const clientApi = require('./routes/client');
const cloudinary = require('cloudinary').v2;


// configure cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET
})

// set up middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.DB, (err)=>{
    if (err) console.log("Error Occured: ", err.message);
    else{
        console.log("Db Connection Successul");
    }
}) 

// connect to server 
app.listen(process.env.PORT, (err)=>{
    err ? console.log("Server Err: ", err.message) : console.log("Server running successfully...");
})

// link routes
app.use('/api', admApi);
app.use('/api', clientApi)

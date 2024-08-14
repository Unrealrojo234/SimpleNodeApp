const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

//Importing Models
const Info = require('./models/profile');

//Getting Database connection string
const connectionString =  process.env.DATABASE_CONNECTION_STRING;

//Express Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('<h1>Simple Web App Test</h1>')
});



//Posting Data to the database
app.post('/info', async (req,res)=>{
    try{
        const info = await Info.create(req.body);
        res.status(200).json(info);
        res.send(console.log(info))

    }catch(error){
       res.status(500).json({
        message:error.message
       })
    }
})

//Getting data from the Database
app.get('/info', async(req,res)=>{
    try{
        const info = await Info.find({})
        res.status(200).json(info)

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
});

mongoose.connect(connectionString)
    .then(()=>{
        console.log("Successfully connected to the database");  
    })
    .catch(()=>{
        console.log('Failed to connect to the database');
    })
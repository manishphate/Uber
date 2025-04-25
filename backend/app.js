const dotenv= require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const app=express();
const ConnectToDB = require('./db/db')

const router = require('./routes/user.route.js')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
ConnectToDB();

app.get('/',(req, res)=>{
    res.send("Hello world")
})

app.use('/user',router)


module.exports= app;
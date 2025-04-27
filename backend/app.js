const dotenv= require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const app=express();
const ConnectToDB = require('./db/db')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.route.js')
const captainRouter = require('./routes/captain.route.js')

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
ConnectToDB();

app.get('/',(req, res)=>{
    res.send("Hello world")
})

app.use('/users',userRouter)
app.use('/captains',captainRouter)


module.exports= app;
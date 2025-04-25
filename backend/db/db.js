const {connect} = require('mongoose')

const ConnectToDB= async()=>{
   await connect(process.env.MONGODB).then(()=>{
    console.log("connect to db")
   }).catch((err)=>{
    console.log(err)
   });
}

module.exports= ConnectToDB
const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long']
        },
        lastname:{
            type:String,
        }
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        // required:true
    }
})

module.exports = model('user',userSchema)
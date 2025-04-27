const captainModel = require('../models/captain.model.js')
const compareEncryptData = require('../utility/compareEncryptData.utility.js')
const encryptData = require('../utility/encryptData.utility')
const jwt = require('jsonwebtoken')

const registerCaptain = async (req, res, next) => {
    try {
        let { fullname, mobile, email, password, vehicle, location } = req.body
        let { firstname, lastname } = fullname;
        let { color, plate, capacity, vehicleType } = vehicle

        if (!fullname, !mobile, !email, !password, !vehicle) {
            return res.status(409).json({ error: true, message: "all field required" })
        }

        let isCaptain = await captainModel.findOne({ $or: [{ email }, { mobile }] })

        if (isCaptain) {
            return res.status(400).json({ error: true, message: "email or mobile number already register" })
        }

        let hashedPassword = await encryptData(password);

        let captainData = await captainModel.create({ fullname: { firstname, lastname }, mobile, email, password: hashedPassword, vehicle: { color, plate, capacity, vehicleType }, location })
        let token = jwt.sign({ _id: captainData._id }, "123", { expiresIn: "24h" })

        res.status(201).json({error:false, message:"captain register successfully", data:captainData,token})
    } catch (error) {
        console.log(error)
        next()
    }
}

const loginCaptain = async (req, res, next) =>{
    try {
        let {username, password} = req.body

        if(!username || !password)
        {
            return res.status(400).json({error:true, message:"all field required"})
        }

        let isCaptain = await captainModel.findOne({$or:[{email:username},{mobile:username}]})

        if(!isCaptain)
        {
            return res.status(400).json({error:true, message:"invalid username or password"})
        }

        let hashedPassword= await compareEncryptData(password, isCaptain.password)

        if(!hashedPassword)
        {
            return res.status(400).json({error:true, message:"invalid username or password"})
        }

        let token =jwt.sign({_id:isCaptain._id},"123",{expiresIn:"24h"})

        res.status(200).json({error:false, message:"captain login successfully", data:isCaptain,token})

    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = {
    registerCaptain,
    loginCaptain
}
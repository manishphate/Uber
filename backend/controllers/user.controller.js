const userModel = require('../models/user.model.js')
const encryptData = require('../utility/encryptData.utility.js')

const registerUser = async(req,res, next)=>{

    try {

        let {fullname,mobile, email, password} = req.body;
        let {firstname, lastname} = fullname;

        if(!firstname || !lastname || !mobile || !email || !password)
        {
            res.status(409).json({error:true,data:"all field required"})
        }

        let isUser =await userModel.findOne({mobile,email});

        if(isUser)
        {
            res.status(409).json({error:true, data:"mobile number allready register"})
        }

        let hashedPassword = await encryptData(password);

        let user = await userModel.create({fullname:{firstname,lastname}, mobile, email, password:hashedPassword})

        res.status(201).json({error:false, message:"user create successfully", data:user})
        
        
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports={
    registerUser
}
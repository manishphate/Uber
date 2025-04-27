const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blacklistToken.model')

const Auth = async (req, res, next) => {

    try {
        let token = req.cookies.token || req.headers.authorization

        if (!token) {
            return res.status(401).json({ error: true, message: "invalid user" })
        }

        // const isBlacklisted = await blacklistTokenModel.findOne({token: token});

        // if(!isBlacklisted)
        // {
        //     return res.status(401).json({message:'unathorized'})
        // }

        if(token && token.startsWith("Bearer"))
            {
                token = token.split(" ")[1]
    
                let decodedData = jwt.verify(token, "123");
                // console.log(decodedData);
                req.user={_id:decodedData._id}
                next()
            }else{
                return res.status(499).json({error:true, message:"Token Required"})
            }


    } catch (error) {
        console.log(error)
        return res.status(499).json({error:true, message:"invalid token"})
    }
}

module.exports=Auth
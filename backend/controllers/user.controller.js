const userModel = require('../models/user.model.js')
const encryptData = require('../utility/encryptData.utility.js')
const jwt = require("jsonwebtoken");
const compareEncryptData = require('../utility/compareEncryptData.utility.js');
const blacklistTokenModel = require('../models/blacklistToken.model.js');

const registerUser = async (req, res, next) => {

    try {

        let { fullname, mobile, email, password } = req.body;
        let { firstname, lastname } = fullname;

        if (!firstname || !lastname || !mobile || !email || !password) {
            return res.status(409).json({ error: true, message: "all field required" })
        }

        let isUser = await userModel.findOne({ mobile, email });

        if (isUser) {
            return res.status(409).json({ error: true, message: "mobile number allready register" })
        }

        let hashedPassword = await encryptData(password);

        let user = await userModel.create({ fullname: { firstname, lastname }, mobile, email, password: hashedPassword })
        let token = jwt.sign({ _id: user._id }, "123", { expiresIn: "300m" })
        res.status(201).json({ error: false, message: "user create successfully", data: user, token })


    } catch (error) {
        console.log(error)
        next();
    }
}

// *************************************************************************

const loginUser = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(409).json({ error: true, message: "all field required" })
        }

        let isUser = await userModel.findOne({ $or: [{ email: username }, { mobile: username }] });

        if (!isUser) {
            return res.status(409).json({ error: true, message: "invaild username or password" })
        }

        let checkPassword = await compareEncryptData(password, isUser.password)

        if (!checkPassword) {
            return res.status(409).json({ error: true, message: "invaild username or password" })
        }

        let token = jwt.sign({ _id: isUser._id }, process.env.JWT_PASSWORD, { expiresIn: "300m" })
        res.status(201).json({ error: false, message: "user login successfully", data: isUser, token })

    } catch (error) {
        console.log(error)
        next()
    }
}

// ****************************************************************************

const getProfile = async (req, res, next) => {
    try {
        let { _id } = req.user
        let isUser = await userModel.findById({ _id })

        if (!isUser) {
            return res.status(400).json({ error: true, message: "user not found" })
        }

        res.status(201).json({ error: false, data: isUser })
    } catch (error) {
        console.log(error)
    }
}

// const logoutUser = async(req, res, next)=>{
//     try {
//         const token =  req.headers.authorization.split(' ')[1];

//         await blacklistTokenModel.create({token});

//         res.status(200).json({message:'Logged out'})
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    // logoutUser
}
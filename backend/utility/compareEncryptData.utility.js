const bcrypt = require("bcryptjs");

let compareEncryptData = async(data, hashedData)=>{

    return await bcrypt.compare(data,hashedData);
}

module.exports=compareEncryptData;
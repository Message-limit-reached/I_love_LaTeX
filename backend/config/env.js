require('dotenv').config();

module.exports={
    mongostr:process.env.MONGO_STR,
    jwtsecret:process.env.JWT_SECRET
}
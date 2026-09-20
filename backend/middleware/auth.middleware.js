const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../config/env')

const precheck= (req,res,next)=>{
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token){
            return res.status(401).json({message:'not authorized no token available'});
        }
        const decoded = jwt.verify(token,jwtsecret);
        req.user = decoded;

        next();
    }catch(error){
        return res.status(401).json({message:`authorization error: ${error}`});
    }
};
module.exports={precheck};
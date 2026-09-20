const USER = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtsecret} = require('../config/env');
const user = require('../models/user');

const jwtgeneration = (userID)=>{
    return jwt.sign({id:userID},jwtsecret,{expiresIn:'30d'});
};

const Signuplogic = async(username,email,password)=>{
    try{
        if(!username||!email||!password){
            throw{ status:400,message:'All fields are required'};
        }
        
        const usernameExists = await USER.findOne({username});
        if (usernameExists){
            throw{ status:400,message:'Username is already used'};
        }
        const emailExists = await USER.findOne({email});
        if (emailExists){
            throw{ status:400,message:'You have account with this email try login'};
        }
        const newsalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,newsalt)
        const addUser = await USER.create({
            username,
            email,
            password:hashedPassword,

        });
        return {
            token:jwtgeneration(addUser._id),
            user:{id:addUser._id,username:addUser.username,email:addUser.email}
        }
    }
    catch(error){
        console.error(`signup error: ${error}`)
    }
};

const Loginlogic = async(identifier,password)=>{
    try{
        if (!identifier||!password){
            throw{ status:400,message:'Username/Email and password are required'}; 
        };
        //const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //const isemail = regex.test(identifier);
        const user = await USER.findOne({$or:[{username:identifier},{email:identifier}]});
        if (!user){
            throw{status:401,message:'invalid credentials'};
        }
        const passcheck = await bcrypt.compare(password,user.password);
        if (!passcheck){
            throw{status:401,message:'invalid credentials'};
        }
        return {token:jwtgeneration(user._id),
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        };

    }catch(error){
        console.error(`Login error: ${error}`)
    }
};
module.exports={Signuplogic,Loginlogic};
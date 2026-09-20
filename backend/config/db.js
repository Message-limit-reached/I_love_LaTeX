const mongoose = require('mongoose');
const {mongostr} = require('./env')
const connectdb = async()=>{
    try{
        await mongoose.connect(mongostr)
        console.log('Connected succefully')
    }
    catch (error){
        console.error(`Error db.js: ${error.message}`);
        process.exit(1);
    }
};
module.exports={connectdb};
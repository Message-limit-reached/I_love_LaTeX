const express = require('express');
const{connectdb}=require('./config/db')
const fs = require('fs');
const app = express();
const PORT = 3000;
var signup = false

connectdb().then(()=>{
    app.listen(PORT,()=>console.log("server running on port 3000"))
});

app.post('/auth/register',(req,res)=>{

    res.send("Sign up Succ")
});

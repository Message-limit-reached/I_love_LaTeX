const mongoose= require('mongoose');
const userschema = mongoose.Schema(
    {
        username: {type:String,unique:true,required:[true,'Username is required'],minlength:[3,'Minimum length 3 characters'],maxlength:[21,'Maximum length 21 characters'],trim:true},
        email: {type:String,unique:true,required:[true,'Email address is required'],trim:true},
        password: {type:String,required:[true,'Password is required'],minlength:[8,'Password mush be atleast 8 characters']},
},
{
    timestamps:true
}
);
const user = mongoose.model('user',userschema);
module.exports=user;
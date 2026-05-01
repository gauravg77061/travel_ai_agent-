const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        validate:{
            validator(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Password is not strong")
                }
            }
        }
    },
    

},{timestamps:true})

UserSchema.methods.getJwt=async function () {
    const user=this;
    const token=await jwt.sign({_id:user.id},"DEV@Tinder@790");
    //console.log("token",token)
    return token;
    
}

UserSchema.methods.validatePassword=async function (passwordEntered) {
    const user=this;
    const hashPassword=user.password;
    const isPasswordValid=await bcrypt.compare(passwordEntered,hashPassword)
    return isPasswordValid;
}




const User=mongoose.model("User",UserSchema);

module.exports=User
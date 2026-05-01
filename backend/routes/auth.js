const express=require('express')

const authRouter=express.Router()

const bcrypt=require('bcrypt')

const validator=require('validator')

const User=require('../models/User')

//signup

authRouter.post('signup',async(req,res)=>{

  try {

    const{firstName,LastName,email,password}=req.body;

    const checkForEmail=await User.findOne({email});

    if(checkForEmail){
        throw new Error('Emal is already registered')
    }

    const hashPassword=await bcrypt.hash(password,10)

    const user=new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword
    })

    const savedUser=await user.save();

    const token = await user.getJwt();

    res.cookie("token",token)

    res.json({
        message:'signup successfully',
        data:savedUse,
    })
    
  } catch (error) {
    res.status(400).send("Error"+error.message);
  }



})

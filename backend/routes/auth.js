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

//login 

authRouter.post('/login',async(req,res)=>{

    try {
        
        const {email,password}=req.body;

        if(!validator.isEmail(email)){
            throw new Error("Invalid EMail id");
            
        }

        const user=await User.findOne({email})

        if(!user){
            throw new Error("Invald email id")
        }

        //validating password 

        const isPassword=await User.validatePassword(password)

        if(isPassword){
            const token=await user.getJwt()

            res.cookie("token",token);

            res.send(user);
        }

    } catch (error) {
        throw new Error("Error"+error.message)
    }

})

authRouter.post('/logout',async(req,res)=>{
       try {

        //expiring cookie changing date to date now

        res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout successfully");
    } catch (error) {
        res.status(400).send("error "+ error.message);
    }
})

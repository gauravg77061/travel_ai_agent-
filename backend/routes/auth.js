const express=require('express')

const authRouter=express.Router()

const bcrypt=require('bcrypt')

const validator=require('validator')

const User=require('../models/User')

//signup

authRouter.post('/signup',async(req,res)=>{

  try {

    const{firstName,lastName,email,password}=req.body;

    const checkForEmail=await User.findOne({email});

    if(checkForEmail){
        throw new Error('Email is already registered')
    }

    const hashPassword=await bcrypt.hash(password,10)

    const user=new User({
        firstName,
        lastName,
        email,
        password:hashPassword
    })

    const savedUser=await user.save();

    const token = await user.getJwt();

    res.cookie("token",token)

    res.json({
        message:'signup successfully',
        data:{
            _id:savedUser._id,
            firstName:savedUser.firstName,
            lastName:savedUser.lastName,
            email:savedUser.email,
        },
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

        const savedUser=await User.findOne({email})

        if(!savedUser){
            throw new Error("Invald email id")
        }

        //validating password 

        const isPassword=await savedUser.validatePassword(password)

        if(isPassword){
            const token=await savedUser.getJwt()

            res.cookie("token",token);

            res.status(200).json({
            message:'login successfully',
            data:{
                _id:savedUser._id,
                firstName:savedUser.firstName,
                lastName:savedUser.lastName,
                email:savedUser.email,
            },
    })
        }
        else {
            throw new Error('Invalid credentials')
        }

    } catch (error) {
        res.status(400).send("Error"+error.message);

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


module.exports=authRouter;

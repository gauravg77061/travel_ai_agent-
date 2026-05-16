const express=require('express')

const {userAuth} = require("../middleware/authMiddleware")

const User=require("../models/User")

const profileRouter=express.Router();

const safeData=["firstName","lastName"]


profileRouter.get('/view',userAuth,async(req,res)=>{
    try {
        const user=req.user;

        if(!user){
            throw new Error("User not present")
        }

        res.status(200).json({
            data:{
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
        }
        })

    } catch (error) {
        res.status(401).json({
            message:"Error"+error.message
        })
    }
})

module.exports=profileRouter;





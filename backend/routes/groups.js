const express=require("express")
const groupRouter=express.Router();

const Group=require("../models/group")
const {userAuth}=require("../middleware/authMiddleware")

//function for generating random code for joining 

const generativeInviteCode = ()=>{
    return Math.random().toString(36).substring(2,8).toUpperCase();

}

groupRouter.post('/create',userAuth,async(req,res)=>{
   
    try {
           
        const {groupName}=req.body;

            if(!groupName){
                throw new Error("Group name is required")

            }
            

            const userId=req.user._id;
            //console.log(userId)

            const inviteCode = generativeInviteCode();

            //console.log(inviteCode)

            const group=await Group.create({
                name:groupName,
                inviteCode,
                ownerId:userId,
                members:[userId]
            })

            return res.status(200).json({
                message:"Group created successfully",
                data:group,
            })



    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }



})

module.exports = groupRouter;





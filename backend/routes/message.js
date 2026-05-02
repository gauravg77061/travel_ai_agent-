const express=require("express")

const messageRouter=express.Router()

const Message=require("../models/message")

const Group=require("../models/group")


const {userAuth}= require("../middleware/authMiddleware")

messageRouter.post('/send',userAuth,async(req,res)=>{
    try {
        const{groupId,text}=req.body;

        if(!groupId || !text){
            throw new Error("groupId or text not available")

        }

        const group=await Group.findById(groupId);

        if(!group){
            throw new Error("Group not present")
        }

        const userId=req.user._id;

        const isMember=group.members.some(
            (member) =>member.toString() === userId.toString()
        );

        if(!isMember){
            throw new Error("You are not a member of this group")
        }

        const message=await Message.create({
           groupId,
           senderId:userId,
           role:"user",
           text,
        });

        return res.status(200).json({
              message:"Message sent successfully",
            data:message,
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
})

module.exports=messageRouter;
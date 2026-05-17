const express=require("express")

const messageRouter=express.Router()

const Message=require("../models/message")

const Group=require("../models/group")

const axios=require('axios')

const {sendMessageService}=require("../services/messageService")

const {userAuth}= require("../middleware/authMiddleware")

messageRouter.post('/send',userAuth,async(req,res)=>{
   
    try {
        const{groupId,text}=req.body

        const senderId=req.user._id;

        const result=await sendMessageService({
            groupId,
            senderId,
            text,
        })

        return res.status(200).json({
            message:"Message sent successfully",
            data:result
        })
    } catch (error) {
        return res.status(400).json({
            error:error.message
        })
    }
})

//Get route for fetching the all the group messages

messageRouter.get('/:groupId',userAuth,async(req,res) =>{
    try {
        const groupId=req.params.groupId;

        if(!groupId){
            throw new Error("GroupId iss required")
        }

        const group=await Group.findById(groupId)

        if(!group){
            throw new Error("No group found")
        }

        const userId=req.user._id;

        const isMember=group.members.some(
            (member) => member.toString() ===userId.toString()
        )

        if(!isMember){
            throw new Error("you are not a members of this group")
        }

       const messages = await Message.find({ groupId })
  .populate("senderId", "firstName lastName")
  .sort({ createdAt: 1 });

        return res.status(200).json({
            message:"Message fetched successfully",
            data:messages
        })

    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }
})

module.exports=messageRouter;
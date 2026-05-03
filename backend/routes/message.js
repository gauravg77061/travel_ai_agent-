const express=require("express")

const messageRouter=express.Router()

const Message=require("../models/message")

const Group=require("../models/group")

const axios=require('axios')

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

        const userMessage=await Message.create({
           groupId,
           senderId:userId,
           role:"user",
           text,
        });

        let aiMessages = null;

        if(text.toLowerCase().includes("@ai")){
            const response=await axios.post(
                "http://127.0.0.1:8000/chat",

            {
                query:text
            }
        );

        const aiResponse=response.data.response;

        aiMessages=await Message.create({
            groupId,
            senderId:null,
            role:"ai",
            text:aiResponse,
        })

    }
            
    

        return res.status(200).json({
              message:"Message sent successfully",
            data:{
                userMessage,
                aiMessages,
            }
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

        const messages=await Message.find({groupId}).sort({createdAt:1})

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
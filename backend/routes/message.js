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

        //saves user messages 

        const userMessage=await Message.create({
           groupId,
           senderId:userId,
           role:"user",
           text,
        });

        let aiMessages = null;

        // AI Trigger

        if(text.toLowerCase().includes("@ai")){

            //Fetch last 10 messages 

       

            const recentMessages= await Message.find({groupId})
            .sort({createdAt:-1})
            .limit(10)

            const filteredMessages = recentMessages
            .reverse()
            .filter(msg =>{
                const text = msg.text.toLowerCase().trim();

                if(text.length < 5) return false;

                const noiseWords=["ok","okay","hi","hello","yes","no","lol"]

                if(noiseWords.includes(text)) return false;

                return true;

            })

            // Building context

            const context = filteredMessages
            .map(msg => `${msg.role} :${msg.text}`)
            .join("\n")

          const systemPrompt = `
            ROLE:
            You are an AI travel assistant inside a group chat.

            CONTEXT:
            You are helping users plan trips based on their conversation.

            INSTRUCTIONS:
            - Understand the user's intent carefully
            - Use previous messages for context
            - Give practical and relevant travel suggestions
            - If details like budget, group size, or location are mentioned, use them
            - Do not repeat unnecessary information

            OUTPUT STYLE:
            - Keep answers short and clear
            - Use bullet points if needed
            - Sound like a helpful friend, not a robot
            `;

               const finalQuery=systemPrompt+"\n\n"+context+"\nuser:"+text; 


            const response=await axios.post(
                "http://127.0.0.1:8000/chat",

            {
                query:finalQuery,
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
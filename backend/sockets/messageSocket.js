const Group=require('../models/group')
const Message=require("../models/message")

const{sendMessageService} =require("../services/messageService")

const registerMessageSocket=(io,socket) =>{
    console.log("Socket connected",socket.id)

    socket.on("join_group",(groupId) =>{
        socket.join(groupId)

         console.log(`Socket ${socket.id} joined group ${groupId}`)

    })

    //send message 
    socket.on("send_message",async(data) => {
        try {
            const{groupId,senderId,text} = data;

            const result=await sendMessageService({
                groupId,
                senderId,
                text,
            })

            io.to(groupId).emit(
                "receive_message",
                result.userMessage
            )

            //Emit ai message if exists 

            if(result.aiMessage){
                io.to(groupId).emit(
                    "receive_message",
                    result.aiMessage
                )
            }
            

        } catch (error) {
            console.log(error.message)
        }
    })

    socket.on("disconnect",()=>{
        console.log("Socket disconnected:",socket.id)
    });

    
};

module.exports=registerMessageSocket


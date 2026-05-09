const Group=require('../models/group')
const Message=require("../models/message")

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

            if(!groupId || !senderId || !text){
                throw new Error("Invald message data")

            }

            const group=await Group.findById(groupId);

            if(!group){
                throw new Error("Group not found")
            }

            const isMember = group.members.some(
                (member) => member.toString() === senderId.toString()
            );

            if(!isMember){
                throw new Error("you are not a member of this group")
            }

            const savedMessage=await Message.create({
                groupId,
                senderId,
                role:"user",
                text,
            })

            io.to(groupId).emit("receive_message",savedMessage)

        } catch (error) {
            console.log(error.message)
        }
    })

    socket.on("disconnect",()=>{
        console.log("Socket disconnected:",socket.id)
    });

    
};

module.exports=registerMessageSocket


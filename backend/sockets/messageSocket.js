const registerMessageSocket=(io,socket) =>{
    console.log("Socket connected",socket.id)

    socket.on("join_group",(groupId) =>{
        socket.join(groupId)

         console.log(`Socket ${socket.id} joined group ${groupId}`)

    })

    socket.on("disconnect",()=>{
        console.log("Socket disconnected:",socket.id)
    });

   
};

module.exports=registerMessageSocket


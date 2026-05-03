const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema(
    {
        groupId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Group",
            required:true,

        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:false,
        },
        role:{
            type:String,
            required:true,
            trim:true,
        },
        text:{
            type:String,
            required:true,
            trim:true,
        },

    },
    {timestamps:true}
);

module.exports=mongoose.model("Message",messageSchema);
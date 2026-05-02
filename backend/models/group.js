const mongoose =require('mongoose')

const groupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    inviteCode:{
        type:String,
        unique:true,
        required:true,
        index:true,
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

},{timestamps:true});

module.exports = mongoose.model("Group",groupSchema)
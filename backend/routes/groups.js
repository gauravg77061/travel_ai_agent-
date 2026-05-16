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

groupRouter.post('/join',userAuth,async(req,res)=>{
    try {
        
        const {inviteCode} = req.body;

        if(!inviteCode){
            throw new Error("Invite Code is required")

        }

        const group=await Group.findOne({inviteCode})

        if(!group){
            throw new Error("Invalid invite Code")
        }

        const userId=req.user._id;

        const isMember = group.members.some(
  (member) => member.toString() === userId.toString()
)

        if(isMember){
            return res.status(200).json({
                message:"Already a member",
                data:group,
            })
        }

        group.members.push(userId);

        await group.save();

        return res.status(200).json({
            message:"Joined group successfully",
            data :group,
        })
        

    } catch (error) {
        return res.status(400).json({
            error:error.message,
        })
    }
})

groupRouter.get('/all',userAuth,async(req,res) =>{
    try {
        
        const userId=req.user._id;

        const groups=await Group.find({
            members: userId,
        })


        return res.json({
            message:"Group fetched successfully",
            data:groups
        })

    } catch (error) {
        return res.status(400).json({
            error:error.message,
        })
    }
})

groupRouter.get('/:id',userAuth,async(req,res)=>{
    try {
        
        const groupId=req.params.id;

        if(!groupId){
            throw new Error("Group id not prsent")
        }

        const group=await Group.findById(groupId);

        if(!group){
            throw new Error("Group not found")
        }

        const userId=req.user._id;

         const isMember = group.members.some(
      (member) => member.toString() === userId.toString()
    );

        if(!isMember){
            res.status(400).json({
                message : "You are not the members of this group"
            })
        }

        return res.status(200).json({
            message:"Group fetched successfully",
            data:group,
        })

    } catch (error) {
        res.status(400).json({
            error:error.message,
        })
    }
})



module.exports = groupRouter;





import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import cookieParser from 'cookie-parser';

const userAuth= async(req,res,next)=>{
    try {
        const {token}=req.cookies;

        if(!token){
            return res.status(401).send('Please login')
        }

        

        const decodedMessage=await jwt.verify(token,process.env.JWT_SECRET);

        console.log(decodedMessage)

        const {_id}=decodedMessage;

        const user=await  User.findById(_id);

        if(!user){
            throw new Error("Error in finding user id")
        }

        req.user=user;

        next();



    } catch (error) {
        res.status(400).send("Error message "+error.message);
    }
}
export{
    userAuth
}
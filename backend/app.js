const express=require('express')
const connectDB=require("./config/dataBase");
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth');
const profileRouter = require('./routes/profile');
const {userAuth}=require("./middleware/authMiddleware")
require("dotenv").config()

const app=express();

app.use(cookieParser())

app.use(express.json())

app.use('/auth',authRouter);

app.use('/profile',profileRouter)

connectDB()
.then(()=>{
    console.log("Data base connected successfully")
    app.listen(process.env.PORT,()=>{
        console.log(`server is running at port number port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.error(error);
    console.log("Data base can not be connected ")
})
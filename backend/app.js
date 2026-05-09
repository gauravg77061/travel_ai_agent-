const express=require('express')
const connectDB=require("./config/dataBase");
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/auth');
const profileRouter = require('./routes/profile');
const groupRouter=require('./routes/groups')
const {userAuth}=require("./middleware/authMiddleware");
const messageRouter = require('./routes/message');
const http=require('http')
const {Server}=require("socket.io")
const registerMessageSocket=require('./sockets/messageSocket')
require("dotenv").config()


const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

app.use(cookieParser())

app.use(express.json())

app.use('/auth',authRouter);

app.use('/profile',profileRouter)


app.use('/group',groupRouter);

app.use('/message',messageRouter)

io.on("connection",(socket) => {
    registerMessageSocket(io,socket);
})


connectDB()
.then(()=>{
    console.log("Data base connected successfully")
    server.listen(process.env.PORT,()=>{
        console.log(`server is running at port number port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.error(error);
    console.log("Data base can not be connected ")
})
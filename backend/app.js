const express=require('express')
const connectDB=require("./config/dataBase")
require("dotenv").config()

const app=express();

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
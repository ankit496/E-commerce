const express=require('express')
const server=express()
const connectMongoose=require('./dbConnect')
server.get('/',(req,res)=>{
    res.json({status:'success'})
})
connectMongoose()
server.listen(8080,()=>{
    console.log('server started on port 8080')
})
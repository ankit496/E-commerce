const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const dbUrl=process.env.DB_URL
const connectMongoose=()=>{
    mongoose.connect(dbUrl)
    const db=mongoose.connection
    db.on("error",console.error.bind(console,"connection error"))
    db.once("open",()=>{
        console.log('Database connected')
    })
}
module.exports=connectMongoose
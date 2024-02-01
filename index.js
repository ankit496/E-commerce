const express=require('express')
const server=express()
const connectMongoose=require('./dbConnect')
const { createProduct } = require('./controller/Product')
const productRouter=require('./routes/Products')
const categoriesRouter=require('./routes/Categories')
const brandsRouter=require('./routes/Brands')
const cors=require('cors')

//middlewares
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json())
server.use('/products',productRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands',brandsRouter.router)


server.get('/',(req,res)=>{
    res.json({status:'success'})
})



connectMongoose()
server.listen(8000,()=>{
    console.log('server started on port 8000')
})
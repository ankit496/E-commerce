const express=require('express')
const server=express()
const connectMongoose=require('./dbConnect')
const { createProduct } = require('./controller/Product')
const productRouter=require('./routes/Products')
const categoriesRouter=require('./routes/Categories')
const brandsRouter=require('./routes/Brands')
const orderRouter=require('./routes/Orders')
const usersRouter=require('./routes/User')
const authRouter=require('./routes/Auth')
const cartRouter=require('./routes/Cart')
const cors=require('cors')

//middlewares
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json())
server.use('/products',productRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands',brandsRouter.router)
server.use('/users',usersRouter.router)
server.use('/cart',cartRouter.router)
server.use('/auth',authRouter.router)
server.use('/orders',orderRouter.router)


server.get('/',(req,res)=>{
    res.json({status:'success'})
})



connectMongoose()
server.listen(8000,()=>{
    console.log('server started on port 8000')
})
const { Order } = require("../models/Order")

exports.fetchOrderByUser=async(req,res)=>{
    const {id}=req.user
    try{
        const orders=await Order.find({user:id})
        console.log(id,orders)
        res.status(200).json(orders)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.createOrder=async(req,res)=>{
    console.log(req.body)
    const data=req.body
    const order=new Order({items:data.items,totalAmount:data.totalAmount,totalItems:data.totalItems,user:data.user.id,paymentMethod:data.paymentMethod,status:data.status,selectedAddress:data.selectedAddress,})
    try{
        const doc=await order.save()
        res.status(201).json(doc)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.updateOrder=async(req,res)=>{
    const {id}=req.params
    try{
        const response=await Order.findByIdAndUpdate(id,req.body.order)
        res.status(200).json(response)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.deleteOrder=async(req,res)=>{
    const {id}=req.params
    try{
        const doc=await Order.findByIdAndDelete(id)
        res.status(200).json(doc)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.fetchAllOrders=async(req,res)=>{
    let query=Order.find({deleted:{$ne:true}})
    let totalOrdersQuery=Order.find({deleted:{$ne:true}})
    if(req.query._sort && req.query._order){
        query=query.sort({[req.query._sort]:req.query._order})
    }
    const totalDocs=await totalOrdersQuery.count().exec();
    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit
        const page=req.query._page
        query=query.skip(pageSize*(page-1)).limit(pageSize)
    }
    try{
        const docs=await query.exec()
        res.set('X-Total-Count',totalDocs)
        res.status(200).json(docs)
    }
    catch(err){
        res.status(400).json(err)
    }
}
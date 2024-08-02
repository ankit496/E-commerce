
const { Cart } = require("../models/Cart")

exports.fetchCartByUser=async(req,res)=>{
    const {id}=req.user
    try{
        const cart=await Cart.find({user:id}).populate('user').populate('product')
        res.status(200).json(cart)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.addToCart=async(req,res)=>{
    // const cart=new Cart(req.body)
    const {id}=req.user
    // const cart=new Cart({...req.body,user:id})
    try{
        const doc=await Cart.create({...req.body,user:id})
        const result=await Cart.findOne({_id:doc._id}).populate('user').populate('product')
        return res.status(201).json(result)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.updateCart=async(req,res)=>{
    const {id}=req.params
    try{
        const response=await Cart.findByIdAndUpdate({_id:id},{$set:{quantity:req.body.update.quantity}},{new:true,})
        const result=await response.populate('product')
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.deleteFromCart=async(req,res)=>{
    const {id}=req.params
    try{
        const doc=await Cart.findByIdAndDelete(id).exec()
        res.status(200).json(doc)
    }
    catch(err){
        res.status(400).json(err)
    }
}
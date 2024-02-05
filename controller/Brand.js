const { Brand } = require("../models/Brand")

exports.fetchBrands=async(req,res)=>{
    try{
        const brands=await Brand.find()
        res.status(200).json(brands)
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.createBrand=async(req,res)=>{
    const brands=new Brand(req.body)
    try{
        const doc=await brands.save()
        res.status(201).json(doc)
    }
    catch(err){
        res.status(400).json(err)
    }
}
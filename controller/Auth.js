const {User}=require('../models/User')
exports.createUser=async(req,res)=>{
    const users=new User(req.body)
    try{
        const doc=await users.save()
        res.status(201).json({id:doc.id,role:doc.role})
    }
    catch(err){
        res.status(400).json(err)
    }
}
exports.loginUser=async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email},'id name email password role' )
        if(!user){
            res.status(401).json({message:'no such user email'})
        }
        if(user.password===req.body.
        password){
            res.status(200).json({id:user._id,role:user.role})
        }
        else{
            res.status(401).json({message:'Invalid credentials'})
        }
    }
    catch(err){

    }
}
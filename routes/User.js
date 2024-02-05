const express=require('express')
const { createUser, fetchUserById, updateUser } = require('../controller/User')
const router=express.Router()
router.get('/:id',fetchUserById)
    .patch('/:id',updateUser)
exports.router=router
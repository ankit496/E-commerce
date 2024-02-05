const express=require('express')
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/Cart')
const router=express.Router()
router.get('/',fetchCartByUser)
router.post('/',addToCart)
router.delete('/:id',deleteFromCart)
router.patch('/:id',updateCart)
exports.router=router
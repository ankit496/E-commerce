const express=require('express')
const { createOrder, fetchOrderByUser, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order')
const router=express.Router()
router.get('/',fetchAllOrders)
router.post('/',createOrder)
router.get('/own',fetchOrderByUser)
router.delete('/:id',deleteOrder)
router.patch('/:id',updateOrder)
exports.router=router
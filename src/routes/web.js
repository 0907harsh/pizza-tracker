const express=require('express')
const router = new express.Router()
const guest = require('../http/middlewares/guestmiddleware')
const auth = require('../http/middlewares/authmiddleware')
const admin = require('../http/middlewares/adminMiddleware')

//Importing controllers
const homeController = require('../http/controllers/homeController')
const authController = require('../http/controllers/authController')
const cartController = require('../http/controllers/customers/cartController')
const orderController = require('../http/controllers/customers/orderController')
const adminOrderController = require('../http/controllers/admin/orderController')
const statusController = require('../http/controllers/admin/statutsController')

//routes begin here
router.get('/',homeController().index)

router.get('/login',guest,authController().login)
router.post('/login',authController().postLogin)

router.get('/register',guest,authController().register)
router.post('/register',authController().postRegister)

router.post('/logout',authController().logout)

router.get('/cart',cartController().index)
router.post('/update-cart',cartController().updateCart)

//customes routes
router.post('/orders',auth,orderController().store)
router.get('/customers/orders',auth,orderController().index)
router.get('/customers/orders/:id',auth,orderController().show)

// Admin Routes
router.get('/admin/orders',admin,adminOrderController().index)
router.get('/admin/product/addnew',admin,adminOrderController().addnew)
router.get('/admin/products',admin,adminOrderController().products)
router.post('/admin/order/status',admin,statusController().update)
router.post('/admin/product/addnew',admin,adminOrderController().postaddNew)
router.post('/admin/product/remove',admin,adminOrderController().postRemove)

// router.get('*',homeController().index)

//exporting routes
module.exports=router










// const multer=require('multer')
// const sharp=require('sharp')
//new router creation
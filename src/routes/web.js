const express=require('express')
const router = new express.Router()
const guest = require('../http/middlewares/guestmiddleware')

//Importing controllers
const homeController = require('../http/controllers/homeController')
const authController = require('../http/controllers/authController')
const cartController = require('../http/controllers/customers/cartController')

//routes begin here
router.get('/',homeController().index)

router.get('/login',guest,authController().login)
router.post('/login',authController().postLogin)

router.get('/register',guest,authController().register)
router.post('/register',authController().postRegister)

router.post('/logout',authController().logout)

router.get('/cart',cartController().index)
router.post('/update-cart',cartController().updateCart)

router.post('*',homeController().index)

//exporting routes
module.exports=router










// const multer=require('multer')
// const sharp=require('sharp')
//new router creation
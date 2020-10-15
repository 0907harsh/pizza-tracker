const express=require('express')
const router = new express.Router()

//Importing controllers
const homeController = require('../http/controllers/homeController')
const authController = require('../http/controllers/authController')
const cartController = require('../http/controllers/customers/cartController')

//routes begin here
router.get('/',homeController().index)

router.get('/login',authController().login)

router.get('/register',authController().register)

router.get('/cart',cartController().index)
router.post('/update-cart',cartController().updateCart)

//exporting routes
module.exports=router










// const multer=require('multer')
// const sharp=require('sharp')
//new router creation
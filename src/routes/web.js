const express=require('express')
// const multer=require('multer')
// const sharp=require('sharp')
//new router creation
const router = new express.Router()

router.get('/',async (req,res)=>{
        res.render('home')
})

module.exports=router
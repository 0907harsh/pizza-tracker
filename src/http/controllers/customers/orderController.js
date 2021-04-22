const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return {
        async index(req,res){
            // console.log(req.user._id)
            const orders = await Order.find({ customerId: req.user._id },null,
                { sort: {'createdAt':-1}})
            // console.log(orders)
            res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders',{ orders, moment })
            
        },
        store(req,res){
            const phone = req.body.phone
            const address= req.body.Address1+req.body.Address2+req.body.Address1
            // console.log(req.body)
            if(!phone || !req.body.Address2 || !req.body.Address3 || !req.body.Address1){
                req.flash('error','All fields are reuqired')
                return res.redirect('/cart')
            }
            const order = new Order({
                customerId : req.user._id,
                items: req.session.cart.items,
                phone,
                address:address
            })
            // console.log('here')
            order.save().then((result)=>{
                req.flash('success','Order Placed Successfully')
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch((err)=>{
                req.flash('error','Something Went Wrong')
                return res.redirect('/cart')
            })
            // console.log(req.body)
        },
        async show(req,res){
            const order =await Order.findById(req.params.id)
            // Authorize User
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder',{order})
            }
            res.redirect('/')
        }
    }
}

module.exports = orderController
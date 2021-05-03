const Order = require("../../../models/order")
const Menu = require("../../../models/menu")

function orderController(){
    return {
        index(req,res){
            Order.find({ status : { $ne: 'Completed' }},null, {sort: {'createdAt' : -1} }).populate('customerId', '-password').exec((err,orders)=>{
                // console.log(orders)
                if(req.xhr){
                    // console.log('hi')
                    return res.json(orders)
                }
                res.render('admin/orders',{orders})
            })
        },
        addnew(req,res){
            res.render('admin/addnew')
        },
        postaddNew(req,res){
            const {name,price,size}=req.body
            const item = new Menu({
                name,
                price,
                size,
                image: "pizza.png",
            })
            item.save().then((result)=>{
                req.flash('success','Pizza Placed Successfully')
                return res.redirect('/')
            }).catch((err)=>{
                req.flash('error','Something Went Wrong')
                return res.redirect('admin/addnew')
            })
        },
        postRemove(req,res){
            const productId=req.body.productId
            Menu.deleteOne({_id:productId},(err)=>{
                if(err){
                    req.flash('error','Something Went Wrong')
                    return 
                }
                req.flash('success','Pizza Removed From the Menu')
                return res.redirect('/admin/products')
            })
        },
        products(req,res){
            Menu.find({},(err, products)=>{
                // console.log(products)
                if(req.xhr){
                    // console.log('hi')
                    return res.json(products)
                }
                res.render('admin/products',{products})
              })
        }
    }
}

module.exports = orderController
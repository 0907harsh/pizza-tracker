const Order = require("../../../models/order")

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
        }
    }
}

module.exports = orderController
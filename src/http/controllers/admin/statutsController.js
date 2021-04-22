const Order = require('../../../models/order')


function statusController(){
    return {
        update(req,res){
            Order.updateOne({_id:req.body.orderId }, {status:req.body.status},(err,data)=>{
                if(err){
                    req.flash('error','Something Went Wrong')
                    return res.redirect('/admin/orders')
                }
                res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = statusController
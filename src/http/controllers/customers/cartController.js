function cartController(){
    var locals = {
        title: 'Cart Page',
        active_cart:'active',
        description: 'this is the homepage',
    };
    return {
        index(req,res){
            res.render('customers/cart',{locals})
        },
        
        updateCart(req,res){
            //for the first time updating cart
            if(!req.session.cart){
                req.session.cart = {
                    items : {},
                    totalQty : 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart
            // console.log(req.body)
            //Check if items exist in the cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty + 1  
                cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price)
            }else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1  
                cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price)
            }
            // console.log(req.session.cart)
            return res.json({totalQty:req.session.cart.totalQty,messages: "Added to cart"})
        }
    }
}

module.exports = cartController
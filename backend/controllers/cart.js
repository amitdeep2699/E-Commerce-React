
function cart(req,res){
    res.render("cart", { user: req.session.name });
}

module.exports=cart;
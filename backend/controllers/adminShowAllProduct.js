function adminShowAllProduct(req,res){
    res.render("adminShowAllProduct", { user: req.session.name});
}

module.exports=adminShowAllProduct;
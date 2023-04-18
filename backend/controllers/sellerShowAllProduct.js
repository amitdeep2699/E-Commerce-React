function sellerShowAllProduct(req,res){
    res.render("sellerShowAllProducts", { user: req.session.name});
}

module.exports=sellerShowAllProduct;
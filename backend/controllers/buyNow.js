function buyNow(req,res){
    res.render("buynow",{user:req.session.name});
    return
}
module.exports=buyNow;
function checkAuth(req,res,next){
    if(req.session.is_logined && req.session.isVerified){
        next();
        return
    }
    else if(req.session.is_logined && !req.session.isVerified){
        res.render("NotVerified")
        return;
    }
    res.redirect("/");
}

module.exports=checkAuth;
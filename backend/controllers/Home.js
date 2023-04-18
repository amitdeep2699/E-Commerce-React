function home(req,res){
    if(req.session.username=='admin'){
        res.render("admin", { user: req.session.name });
    }else if(req.session.isSeller=='seller'){
        res.render("seller",{ user: req.session.name });
    }
    else{
        res.render("home",{ user: req.session.name });
    }
    return
}
module.exports=home;
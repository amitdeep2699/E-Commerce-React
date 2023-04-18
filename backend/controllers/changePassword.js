
function changePassword(req,res){
    let username = { username: "NULL" }
    res.render("changepassword", username);
    return
}

module.exports=changePassword;
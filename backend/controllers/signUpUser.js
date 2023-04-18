const saveUsers = require("../methods/saveUsers");
const sendEmail = require("./sendEmail");

function signUpPage(req,res){
    res.render("signup", { error: "", name: "", username: "", mobile: "" });
}
function signUpPost(req,res){
    let { name, username, mobile, password, email,isSeller} = req.body;
    let name_error = "", username_error = "", mobile_error = "", error_flag = false;
    if (checkspace(name)) {
        name_error = "Invalid Name";
        error_flag = true;
    }
    if (checkspace(username)) {
        username_error = "Invalid UserName";
        error_flag = true;
    }
    if (checkspace(mobile) || isvalidmobile(mobile)) {
        mobile_error = "Invalid Mobile Number";
        error_flag = true;
    }
    if (error_flag) {
        // res.render("signup", { error: "", name: name_error, username: username_error, mobile: mobile_error })
        res.status(401).json({ error: "", name: name_error, username: username_error, mobile: mobile_error })
        return
    }
    let obj = {
        name: name,
        username: username,
        mobile: mobile,
        password: password,
        email: email,
        isVerified: false,
        mailToken: Date.now(),
        isSeller:isSeller
    }
    saveUsers(obj, function (err, status) {
        if (err) {
            // res.render("signup", { error: [err], name: name_error, username: username_error, mobile: mobile_error })
            res.status(401).json({ error: [err], name: name_error, username: username_error, mobile: mobile_error })
            return
        } else {
            sendEmail(obj, function (err, data) {
                if (err) {
                    // res.render("signup", { error: "Some this went wrong!!!", name: name_error, username: username_error, mobile: mobile_error })
                    res.status(401).json({ error: "Some this went wrong!!!", name: name_error, username: username_error, mobile: mobile_error })
                    return
                } else {
                    // req.session.is_logined = true;
                    // req.session.name = obj.name;
                    // req.session.username = obj.username;
                    // req.session.isVerified = false;
                    // req.session.isSeller=obj.isSeller;
                    // res.redirect("/home");
                    res.status(200).json("succes");
                }
            })
        }
    })
}

function isvalidmobile(mobile) {
    if (mobile.length != 10) {
        return true;
    }
    for (var i = 0; i < mobile.length; i++) {
        if (mobile[i] >= 0 && mobile[i] <= 9) {
            continue;
        } else {
            return true;
        }
    }
    return false;
}

function checkspace(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] != " ") {
            return false;
        }
    }
    return true;
}

module.exports={signUpPage:signUpPage,signUpPost:signUpPost}

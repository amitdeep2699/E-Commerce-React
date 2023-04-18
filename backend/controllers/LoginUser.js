const userData = require("../util/userdata");
const jwt =require('jsonwebtoken');
require("dotenv").config();
function checkLogin(req, res) {
    if (req.session.is_logined) {
        res.redirect("/home");
    }
    else {
        res.render("login", { error: "" });
    }
}
function Login(req, res) {
    let { username, password } = req.body;
    let user = [];
    userData.readUserThroughUsename(username, function (err, data) {
        let flag = true;
        if (data.length == 0) {
            res.status(401).json({ error: "Invalid Username or Passord" })
            // res.render("login", { error: "Invalid Username or Passord" });
            return;
        }
        user = data[0];
        if (user.username === username && user.password === password) {
            // req.session.is_logined = true;
            // req.session.name = user.name;
            // req.session.username = user.username;
            // req.session.isVerified = user.isverified;
            // req.session.isSeller=user.isseller;
            flag = false;
            const token=jwt.sign({
                isVerified:user.isverified,
                name:user.name,
                username:user.username,
                isSeller:user.isseller},process.env.ACCESS_TOKEN);
            // console.log(token);
            // const extractToken=jwt.verify(token,"AmitDeepKushwaha");
            // console.log(extractToken);
            // res.redirect("/home");
            res.status(200).json({token,username:user.name});
        }
        if (flag) {
            res.status(401).json({ error: "Invalid Username or Passord" });
        }
    })
}
module.exports = { checkLogin: checkLogin, Login: Login }


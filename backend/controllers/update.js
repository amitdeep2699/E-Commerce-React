const userData = require("../util/userdata");
const sendUpdateMail = require("../controllers/sendUpdate");
const jwt =require('jsonwebtoken');
require("dotenv").config();
function update(req,res){
    let users = []
    let flag=false;
    if(req.body.token){
        flag=true
    }
    let  password = req.body.data.newpassword;
    if (flag && req.Session.username) {
        userData.readUserThroughUsename(req.Session.username,function (err, data) {
            if (err){
                console.log("error occure at Update time");
                res.status(401).json('fail');
            } else if(data.length>0) {
                users = data[0];
                let email = users.email;
                userData.updatePassword(users.username,password, function (err) {
                    if (err) {
                        console.log("error occure in /update section..")
                        res.status(401).json('fail');
                    }
                    else {
                        sendUpdateMail(email,"Updated", function (err, data) {
                            if (err) {
                                console.log("Update time error occured");
                                res.status(401).json('fail');
                            }
                            else {
                                res.status(200).json('success');
                            }
                        })

                    }
                })
            }
        })
    } else {
        userData.readUserThroughUsename(req.body.username,function (err, data) {
            if (err) {
                console.log("error occure at reset/forgot time")
                res.status(401).json('fail');
            } else if(data.length>0) {
                users = data[0];
                let email = users.email, name = users.name, isVerified = users.isverified;
                userData.updatePassword(users.username,password,function (err) {
                    if (err) {
                        console.log("error occure in reset section..")
                        res.status(401).json('fail');
                    }
                    else {
                        sendUpdateMail(email, "Reset", function (err, data) {
                            if (err) {
                                console.log("Update time error occured");
                                res.status(401).json('fail');
                            }
                            else {
                                // req.session.is_logined = true;
                                // req.session.name = name;
                                // req.session.username = req.body.username;
                                // req.session.isVerified = isVerified;
                                const token=jwt.sign({
                                    isVerified:isVerified,
                                    name:name,
                                    username:users.username,
                                    isSeller:users.isseller},process.env.ACCESS_TOKEN);
                                res.status(200).json('success');
                                
                            }
                        })

                    }
                })
            }
        })
    }
}

module.exports=update;
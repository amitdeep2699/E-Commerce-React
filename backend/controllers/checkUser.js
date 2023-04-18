const userData = require("../util/userdata");
const sendResetMail = require("./sendResetMail");
function checkUser(req, res) {
    let users = {};
    let username= req.body.username;
    userData.readUserThroughUsename(username, function (err, data){
        if (err) {
            res.json({ username: "Notfound" });
            return
        }else if(data.length==0){
            res.json({ username: "Notfound" });
            return
        } else {
            users = data[0];
            console.log(users);
            sendResetMail(users.email,users.mailtoken,(err)=>{
                if(err){
                    res.json({ username: "Notfound" })
                    console.log("error occure reset time.")
                }
                else{
                    res.json(users);
                    return
                }
            })
        }
    })
}

module.exports = checkUser;
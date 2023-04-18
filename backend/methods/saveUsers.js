// const writeFile=require("../util/writeFile");
const userData=require("../util/userdata");
module.exports=function(newUser,callback){
    userData.readUserThroughUsename(newUser.username,function(err,users){
        if(err){
            callback("something went wrong there");
            return
        }
        if(users.length>0){
            callback("user already exist");
            return
        }
        userData.addUser(newUser,function(err){
            if(err){
                callback("error while saveing user");
            }
            else{
                callback(null,true);
            }
        })
    })
    
}
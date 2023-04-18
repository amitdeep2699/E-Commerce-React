const {initDb,client}=require("../database/init")
const readUserThroughUsename=async function(username,callback){
    client.query(`select * from users where username='${username}'`,(err,data)=>{
            callback(null,data.rows);
        });        
}
const readUserThroughToken=async function(token,callback){
    client.query(`select * from users where mailtoken='${token}'`,(err,data)=>{
        callback(null,data.rows);
    });        
}
const addUser= async function (newData, callback) {
    client.query(`insert into users(username,password,name,mobile,email,isverified,mailtoken,isseller) 
    values('${newData.username}',
        '${newData.password}',
        '${newData.name}',
        ${newData.mobile},
        '${newData.email}',
        ${newData.isVerified},
        ${newData.mailToken},
        '${newData.isSeller}')`,(err, res) => {
            console.log(err,res);
        if(err){
            callback("some went is wrong");
            
        }else{
            callback(null);
            
        } 
    })
}
const updateisVarified=async function(username,callback){
        client.query(`update users set isverified=${true} where username='${username}'`,(err,res) => {
            if(err){
                callback("some went is wrong");
                
            }else{
                callback(null);
                
            }
    })
}
const updatePassword=async function(username,password,callback){
    client.query(`update users set password='${password}' where username='${username}'`,(err,res) => {
        if(err){
            callback("some went is wrong");
            
        }else{
            callback(null);
            
        }
})
}
module.exports={readUserThroughUsename:readUserThroughUsename,readUserThroughToken:readUserThroughToken,addUser:addUser,updateisVarified:updateisVarified,updatePassword:updatePassword};
const cartData = require("../util/cartdata");
function getAllUserOrderData(req,res){
    cartData.getAllUserOrderData(req.Session.username,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json();
        }else{
            res.status(200).json({data,username:req.Session.name});
        }
    })
}
module.exports=getAllUserOrderData;
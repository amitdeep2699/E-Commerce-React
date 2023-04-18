const cartData = require("../util/cartdata");
function getAllSellerOrderData(req,res){
    cartData.getAllSellerOrderData(req.Session.username,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json("Some ting is wrong");
        }else{
            res.status(200).json({data,username:req.Session.name});
        }
    })
}
module.exports=getAllSellerOrderData;
const cartData =require("../util/cartdata");
const jwt =require('jsonwebtoken');
require("dotenv").config();
function updateCartQuantity(req,res){
    cartData.updateCartQuantity(req.Session.username,req.body,(err,data)=>{
        if(err){
            console.log(err)
            res.status(401).json({data:'fail'});
        }else{
            res.status(200).json(data);
        }
    })
    
}
 
module.exports=updateCartQuantity;
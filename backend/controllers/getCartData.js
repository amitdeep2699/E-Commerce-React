const cartData = require("../util/cartdata");
function getCartData(req,res){
    cartData.getCartData("Amit_2699",req.body,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data);
        }
    })
}

module.exports=getCartData;
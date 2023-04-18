const cartData= require("../util/cartdata");
function addToCart(req,res){
    cartData.addToCart(req.Session.username,req.body.data,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json("success");
        }
    })
}
module.exports=addToCart;
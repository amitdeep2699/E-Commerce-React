const cartData =require("../util/cartdata");
function deleteCartData(req,res){
    cartData.deleteCartData(req.Session.username,req.body.data.id,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json("success");
        }
    })
}

module.exports=deleteCartData;
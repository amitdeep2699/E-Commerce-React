const cartData = require("../util/cartdata");
function getAllCartData(req,res){
    cartData.getAllCartData(req.Session.username,(err,data)=>{
        if(err){
            console.log(err);
            res.status(401).json('fail');
        }else{
            total=0;
            for(let i=0;i<data.length;i++){
                total+=data[i].prices*data[i].cart_quantity;
            }
            res.status(200).json({data,total:total});
        }
    })
}
module.exports=getAllCartData;
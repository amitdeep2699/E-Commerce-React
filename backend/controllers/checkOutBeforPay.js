const cartData = require("../util/cartdata");
function checkOutBeforPay(req,res){
    cartData.checkOutBeforPay(req.Session.username,(err,data)=>{
        if(err){
            console.log(err);
            return
        }else{
            res.json(data);
        }
    })
}
module.exports=checkOutBeforPay;
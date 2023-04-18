const cartData = require("../util/cartdata");
function checkOut(req,res){
    cartData.checkOut(req.Session.username,req.body.pay_id,(err,data)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send(data);
        }
    })
}
module.exports=checkOut;
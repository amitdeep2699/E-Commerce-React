const adminData=require('../util/admindata');
function updateProduct(req,res){
    adminData.updateProduct(req.body.data,req.body.data.product_id,(err)=>{
        if(err){
            console.log(err);
            res.status(401).json("Fail");
        }else{
            if(req.Session.username=='admin'){
                res.status(200).json("success");
            }else{
                res.status(200).json("success");
            }
        }
    })
}
module.exports=updateProduct;
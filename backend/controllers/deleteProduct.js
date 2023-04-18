const adminData=require('../util/admindata');
function deleteProduct(req,res){
    adminData.deleteProduct(req.body.data.product_id,(err)=>{
        if(err){
            console.log(err);
            res.status(401).json();
        }else{
            res.status(200).json();
        }
    })
}
module.exports=deleteProduct;
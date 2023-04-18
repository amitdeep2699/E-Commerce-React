const adminData=require('../util/admindata')
function getSellerProduct(req,res){
    adminData.getSellerAllProduct(req.Session.username,req.body.data,function (err, data) {
        if(err){
            console.log('error at admin read all product data')
            res.status(401).json('error at admin read all product data');
        }
        else{
            res.status(200).json(data);
        }
    })
}
module.exports=getSellerProduct;
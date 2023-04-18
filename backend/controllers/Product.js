
const adminData=require('../util/admindata')
function Product(req,res){
    adminData.getAllProduct(req.body,function (err, data) {
        if(err){
            console.log('error at admin read all product data')
        }
        else{
            res.status(200).json(data);
        }
    })
}
module.exports=Product;
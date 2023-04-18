const adminData= require("../util/admindata");
function addProduct(req, res){
    let obj;
    if(req.Session.isSeller==='admin'){
        obj = {
            image: req.file.filename,
            product_name: req.body.product_name,
            price: req.body.price,
            description: req.body.description,
            seller: req.body.seller,
            quantity:req.body.quantity
        }
    }else{
        obj = {
            image: req.file.filename,
            product_name: req.body.product_name,
            price: req.body.price,
            description: req.body.description,
            seller: req.Session.username,
            quantity:req.body.quantity
        }
    }
    adminData.addProduct(obj, function (err) {
        if (err) {
            console.log(err)
            res.status(401).json();
        } else {
            res.status(200).json();
        }
    })
}
module.exports = addProduct;
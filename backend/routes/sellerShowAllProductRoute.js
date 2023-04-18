const express=require("express");
const router=express.Router();
const {checkAuthSeller} = require("../middlewres/check_Auth");
const sellerShowAllProduct=require("../controllers/sellerShowAllProduct");
router.get("/",checkAuthSeller,sellerShowAllProduct);
module.exports=router;
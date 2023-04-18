const express=require("express");
const router=express.Router();
const getSellerProduct=require("../controllers/getSellerProduct");
const {checkAuthSeller} = require("../middlewres/check_Auth");
router.post("/",checkAuthSeller,getSellerProduct);
module.exports=router;
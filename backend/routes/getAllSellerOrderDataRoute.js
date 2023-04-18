const express=require("express");
const router=express.Router();
const {checkAuthSeller} = require("../middlewres/check_Auth");
const getAllSellerOrderData=require("../controllers/getAllSellerOrderData");
router.post("/",checkAuthSeller,getAllSellerOrderData);
module.exports=router;
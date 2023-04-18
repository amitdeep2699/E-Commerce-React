const express=require("express");
const router=express.Router();
const {checkAuthSeller} = require("../middlewres/check_Auth");
const updateProduct=require("../controllers/updateProduct");
router.post("/",checkAuthSeller,updateProduct);
module.exports=router;
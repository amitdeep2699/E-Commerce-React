const express=require("express");
const router=express.Router();
const {checkAuthSeller} = require("../middlewres/check_Auth");
const deleteProduct=require("../controllers/deleteProduct");
router.post("/",checkAuthSeller,deleteProduct);
module.exports=router;
const express=require("express");
const router=express.Router();
const {checkAuthAdmin} = require("../middlewres/check_Auth");
const updateProduct=require("../controllers/updateProduct");
router.post("/",checkAuthAdmin,updateProduct);
module.exports=router;
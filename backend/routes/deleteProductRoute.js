const express=require("express");
const router=express.Router();
const {checkAuthAdmin} = require("../middlewres/check_Auth");
const deleteProduct=require("../controllers/deleteProduct");
router.post("/",checkAuthAdmin,deleteProduct);
module.exports=router;
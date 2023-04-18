const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const updateCartQuantity=require("../controllers/updateCartQuantity");
router.post("/",checkAuthUser,updateCartQuantity);
module.exports=router;
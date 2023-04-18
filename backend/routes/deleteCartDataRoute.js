const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const deleteCartData=require("../controllers/deleteCartData");
router.post("/",checkAuthUser,deleteCartData);
module.exports=router;
const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const getCartData=require("../controllers/getCartData");
// router.post("/",checkAuth,getCartData);
router.post("/",checkAuthUser,getCartData);
module.exports=router;
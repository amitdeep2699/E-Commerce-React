const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const getAllCartData=require("../controllers/getAllCartData");
router.post("/",checkAuthUser,getAllCartData);
module.exports=router;
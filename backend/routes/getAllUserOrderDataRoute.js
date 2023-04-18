const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const getAllUserOrderData=require("../controllers/getAllUserOrderData");
router.post("/",checkAuthUser,getAllUserOrderData);
module.exports=router;
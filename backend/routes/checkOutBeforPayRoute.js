const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const checkOutBeforPay=require("../controllers/checkOutBeforPay");
router.post("/",checkAuthUser,checkOutBeforPay);
module.exports=router;
const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const checkOut=require("../controllers/checkOut");
router.post("/",checkAuthUser,checkOut);
module.exports=router;
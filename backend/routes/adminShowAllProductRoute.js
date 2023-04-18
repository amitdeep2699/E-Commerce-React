const express=require("express");
const router=express.Router();
const adminShowAllProduct=require("../controllers/adminShowAllProduct");
const { checkAuthAdmin } = require("../middlewres/check_Auth");
router.get("/",checkAuthAdmin,adminShowAllProduct);
module.exports=router;
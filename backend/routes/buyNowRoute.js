const express=require("express");
const router=express.Router();
const checkAuth = require("../middlewres/checkAuth");
const buyNow=require("../controllers/buyNow");
router.get("/",checkAuth,buyNow);
module.exports=router;
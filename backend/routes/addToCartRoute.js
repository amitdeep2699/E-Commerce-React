const express=require("express");
const router=express.Router();
const {checkAuthUser} = require("../middlewres/check_Auth");
const addToCart=require("../controllers/addToCart");
router.post("/",checkAuthUser,addToCart);
module.exports=router;
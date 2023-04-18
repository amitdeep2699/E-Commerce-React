const express=require("express");
const router=express.Router();
const checkAuth = require("../middlewres/checkAuth");
const cart=require("../controllers/cart");
router.get("/",checkAuth,cart);
module.exports=router;
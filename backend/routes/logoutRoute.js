const express=require("express");
const router=express.Router();
const checkAuth = require("../middlewres/checkAuth");
const logout=require("../controllers/logout");
router.get("/",checkAuth,logout);
module.exports=router;
const express=require("express");
const router=express.Router();
const changePassword=require("../controllers/changePassword");
const checkAuth = require("../middlewres/checkAuth");
router.get("/",checkAuth,changePassword);
module.exports=router;
const express=require("express");
const router=express.Router();
const Home=require("../controllers/Home");
const checkAuth = require("../middlewres/checkAuth");
router.get("/",checkAuth,Home);

module.exports=router;
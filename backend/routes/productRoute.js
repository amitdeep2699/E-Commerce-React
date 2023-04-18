const express=require("express");
const router=express.Router();
const Product=require("../controllers/Product");
router.post("/",Product);
module.exports=router;
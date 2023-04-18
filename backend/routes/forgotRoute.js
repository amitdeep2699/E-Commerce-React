const express=require("express");
const router=express.Router();
const forgot=require("../controllers/forgot");
router.get("/",forgot);
module.exports=router;
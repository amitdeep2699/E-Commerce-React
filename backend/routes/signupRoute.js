const express=require("express");
const router=express.Router();
const signUpUser=require("../controllers/signUpUser");



router.get("/",signUpUser.signUpPage);
router.post("/",signUpUser.signUpPost);
module.exports=router;
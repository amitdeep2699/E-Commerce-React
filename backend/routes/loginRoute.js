const express=require("express");
const router=express.Router();
const login=require("../controllers/LoginUser");

router.get("/",login.checkLogin);
router.post("/",login.Login);

module.exports=router;
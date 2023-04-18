const express=require("express");
const router=express.Router();
const {checkAuthAdmin}=require('../middlewres/check_Auth')
const update=require("../controllers/update");
router.post("/",checkAuthAdmin,update);
module.exports=router;
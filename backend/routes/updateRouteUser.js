const express=require("express");
const router=express.Router();
const {checkAuthUser}=require('../middlewres/check_Auth')
const update=require("../controllers/update");
router.post("/",checkAuthUser,update);
module.exports=router;
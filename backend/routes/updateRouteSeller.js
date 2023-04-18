const express=require("express");
const router=express.Router();
const {checkAuthSeller}=require('../middlewres/check_Auth')
const update=require("../controllers/update");
router.post("/",checkAuthSeller,update);
module.exports=router;
const express=require("express");
const router=express.Router();
const {checkAuthAdmin} = require("../middlewres/check_Auth");
const addProduct=require("../controllers/addProduct");
const multer = require("multer");
const uploads = multer({ dest: "uploads/" })
router.post("/",uploads.single("image"),checkAuthAdmin,addProduct);
module.exports=router;
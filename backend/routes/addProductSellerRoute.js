const express=require("express");
const router=express.Router();
const {checkAuthSeller} = require("../middlewres/check_Auth");
const addProduct=require("../controllers/addProduct");
const multer = require("multer");
const uploads = multer({ dest: "uploads/" })
router.post("/",uploads.single("image"),checkAuthSeller,addProduct);
module.exports=router;
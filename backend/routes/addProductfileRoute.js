const express=require("express");
const router=express.Router();
const checkAuth = require("../middlewres/checkAuth");
const addProductfile=require("../controllers/addProductfile");
const multer = require("multer");
const uploads_file = multer({ dest: "uploads_file/" })
router.post("/",checkAuth,uploads_file.single("csv"),addProductfile);
module.exports=router;
const express = require("express")
const session = require("express-session")
const cors=require("cors");  // for payment
const app = express();
const Razorpay=require("razorpay");
const port = 3000;
const jwt =require('jsonwebtoken');
require("dotenv").config();

// const bodyParser=require('body-parser');

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("uploads"));
app.use(express.static("uploads_file"));
const multer = require("multer");
const uploads = multer({ dest: "uploads/" })
const uploads_file = multer({ dest: "uploads_file/" })

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// connecting pg Sql database

const { initDb, client } = require("./database/init");
initDb();
const checkAuth = require("./middlewres/checkAuth");
const userData = require("./util/userdata");

const { log } = require("console");
const { json } = require("express");


const signupRoute = require("./routes/signupRoute.js")
const loginRoute = require("./routes/loginRoute.js")
const HomeRoute = require("./routes/HomeRoute.js")
const productRoute = require("./routes/productRoute.js")
const checkUserRoute = require("./routes/checkUserRoute.js")
const forgotRoute = require("./routes/forgotRoute.js")
const changePasswordRoute = require("./routes/changePasswordRoute.js")
const logoutRoute = require("./routes/logoutRoute.js")
const getAllUserOrderDataRoute=require("./routes/getAllUserOrderDataRoute.js");
const updateRouteUser = require("./routes/updateRouteUser");
// for cart........
const cartRoute = require("./routes/cartRoute.js")
const getCartDataRoute = require("./routes/getCartDataRoute.js")
const deleteCartDataRoute = require("./routes/deleteCartDataRoute.js")
const addToCartRoute=require("./routes/addToCartRoute.js");
const updateCartQuantityRoute=require("./routes/updateCartQuantityRoute.js")
const buyNowRoute=require("./routes/buyNowRoute.js");
const getAllCartDataRoute=require("./routes/getAllCartDataRoute.js");
const checkOutBeforPayRoute=require("./routes/checkOutBeforPayRoute.js");
const checkOutRoute=require("./routes/checkOutRoute.js")
//for admin...........
const addProductRoute = require("./routes/addProductRoute.js")
const adminShowAllProductRoute = require("./routes/adminShowAllProductRoute.js")
const updateProductRoute=require("./routes/updateProductRoute.js");
const deleteProductRoute=require("./routes/deleteProductRoute.js");
const addProductfileRoute=require("./routes/addProductfileRoute.js");
const addProductfileSellerRoute=require("./routes/addProductfileSellerRoute.js");
const updateRouteAdmin = require("./routes/updateRouteAdmin.js")
// for seller........
const sellerShowAllProductRoute=require("./routes/sellerShowAllProductRoute.js");
const getSellerProductRoute=require("./routes/getSellerProductRoute.js");
const getAllSellerOrderDataRoute=require("./routes/getAllSellerOrderDataRoute.js");
const updateProductSellerRoute=require("./routes/updateProductSellerRoute");
const deleteProductSellerRoute=require("./routes/deleteProductSellerRoute");
const addProductSellerRoute=require("./routes/addProductSellerRoute");
const updateRouteSeller = require("./routes/updateRouteSeller");

const updateRoute = require("./routes/updateRoute")
//users ......................

app.use("/", loginRoute);
app.use("/signup", signupRoute);
app.use("/home", HomeRoute);
app.use("/product", productRoute);
app.use("/checkuser", checkUserRoute);
app.use("/forgot", forgotRoute)
app.use("/changePassword", checkAuth, changePasswordRoute);
app.use("/logout", logoutRoute);
app.use("/getAllUserOrderData",getAllUserOrderDataRoute);
app.use("/updateUser", updateRouteUser);
app.get("/myOrder", checkAuth,(req,res)=>{
    res.render("userOrder",{user:req.session.name});
})


//Adding products...........
const result=[];
app.use("/addProduct", addProductRoute);
app.use("/updateAdmin", updateRouteAdmin);
app.use("/adminShowAllProduct", adminShowAllProductRoute);
app.use("/updateProduct",updateProductRoute);
app.use("/deleteProduct",deleteProductRoute);
app.use("/addProductfile",addProductfileRoute);
app.use("/addProductfileSeller",addProductfileSellerRoute);
// for cart........

app.use("/cart", cartRoute);
app.use("/deleteCartData", deleteCartDataRoute);
app.use("/addToCart",addToCartRoute);
app.use("/getCartData",getCartDataRoute);
app.use("/getAllCartData",getAllCartDataRoute);
app.use("/updateCartQuantity",updateCartQuantityRoute);
app.use('/buynow',buyNowRoute);
app.use('/checkOutBeforPay',checkOutBeforPayRoute);
app.use('/checkOut',checkOutRoute);

// for seller.......

app.use("/addProductSeller", addProductSellerRoute);
app.use("/sellerShowAllProduct",sellerShowAllProductRoute);
app.use("/getSellerProduct",getSellerProductRoute);
app.use("/updateSellerProduct",updateProductSellerRoute);
app.use("/deleteSellerProduct",deleteProductSellerRoute);
app.use("/getAllSellerOrderData",getAllSellerOrderDataRoute);
app.use("/updateSeller", updateRouteSeller);
app.get("/sellerOrder", checkAuth,(req,res)=>{
    res.render("sellerOrder",{user:req.session.name});
})

app.post("/verify", function (req, res) {
    const token=req.body.mailToken;
    let users = [];
    userData.readUserThroughToken(token, function (err, data) {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            users = data;
            // req.session.is_logined = true;
            // req.session.name = users[0].name;
            // req.session.username = users[0].username;
            // req.session.isVerified = true;
            // users[0].isVerified = true;
            userData.updateisVarified(users[0].username, function (err) {
                if (err) {
                    console.log(users);
                }
                else {
                    res.status(200).json({done:"done"});
                    // res.redirect("/home");
                }
            })
        }
    })
})

app.get('/forgotmail',function(req,res){
    res.render("forgotmail");
})
app.get("/reset/:token",function(req,res){
    const {token}=req.params;
    userData.readUserThroughToken(token,(err,data)=>{
        if(err){
            console.log("url:/reset/:token",err);
        }else if(data.length>0){
            res.redirect(`http://localhost:5173/ForgotPass/${data[0].username}`);
        }
    })
})
app.use("/update", updateRoute);
app.get("/forgotPass/:username", function (req, res) {
    let username = req.params;
    res.render("changepassword", username);
    return
})
app.get("/pay",(req,res)=>{
    res.render("payment");
})
app.post("/payment", (req,res)=>{
    let {amount} = req.body;
    let instance = new Razorpay({ key_id: 'rzp_test_8p9QtGbIoUc92r', key_secret: 'REilsv8uvjJf0OU9mGyLKHXG' })
    let order = instance.orders.create({
        amount: amount*100,
        currency: "INR",
      });
    res.status(200).json({
        success:true,
        order,
        amount
    });
}); 

app.post('/checkAuthFront',(req,res)=>{
    if(req.body.token){
        jwt.verify(req.body.token,process.env.ACCESS_TOKEN,(err,result)=>{
            if(err){
                res.status(401).json('fail');
            }else if(result){
                // console.log(result);
                res.status(200).json({name:result.name,isSeller:result.isSeller});
            }
        });
    }else{
        res.status(401).json('fail');
    }
})

app.listen(port, () => {
    console.log("server is started now..... at port 3000");
})









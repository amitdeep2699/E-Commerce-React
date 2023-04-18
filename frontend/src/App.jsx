import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import MailVerify from './pages/Email/mailverify';
import Notverified from './pages/Email/Notverified';
import Forgotmail from './pages/Email/Forgotmail';
import Forgot from './pages/Forgot';
import ChangePassword from './changePassword';
import UserHome from './pages/user/UserHome';
import UserOrder from './pages/user/Order';
import ChangePasswordUser from './pages/user/changePassword';
import Pay from './pages/user/pay';

import AdminHome from './pages/Admin/Home';
import Cart from './pages/user/Cart';
import checkAuth from './api/checkAuth';
import ShowAllProduct from './pages/Admin/ShowAllProduct';
import ChangePasswordAdmin from './pages/Admin/changePassword';

import SellerHome from './pages/Seller/Home';
import ShowAllProductSeller from './pages/Seller/ShowAllProduct';
import SellerOrder from './pages/Seller/Order';
import ChangePasswordSeller from './pages/Seller/changePassword';
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isPadding,setIsPendding]=useState(true);
  const [userType,setUserType]=useState();
  const checkAuthorization=async()=>{
    setIsPendding(true);
    let token=localStorage.getItem("token");
    try{
      let result=await checkAuth({token});
      if(result.status===200){
        result.json()
        .then((data)=>{
          setUserType(data.isSeller);
          setIsLoggedIn(true);
          setIsPendding(false);
        })
      }else{
        setIsLoggedIn(false);
        setIsPendding(false);
      }
    }catch(err){
      console.log(err)
      setIsLoggedIn(false);
    }
  }
  useEffect(()=>{
    checkAuthorization();
  },[isLoggedIn])
  return (
    <>
    <BrowserRouter>
      <Routes>
        {
          isPadding?<Route path="*" element={<h4>Loading....</h4>}/>
          :
          <>{
              isLoggedIn && userType==='user'?
              <>
                <Route path="/UserOrder" element={<UserOrder/>}/>
                <Route path="/Cart" element={<Cart/>}/>
                <Route path="/Notverified" element={<Notverified/>}/>
                <Route path="/ChangePassword" element={<ChangePasswordUser/>}/>
                <Route path="/Pay" element={<Pay/>}/>
                <Route path="*" element={<UserHome/>}/>
              </>
            :
            isLoggedIn && userType==='admin'?
            <>
              <Route path="/showAllProduct" element={<ShowAllProduct/>}/>
              <Route path="/Notverified" element={<Notverified/>}/>
              <Route path="/ChangePassword" element={<ChangePasswordAdmin/>}/>
              <Route path="*" element={<AdminHome/>}/>
            </>
            :
            isLoggedIn && userType==='seller'?
            <>
              <Route path="/showAllProduct" element={<ShowAllProductSeller/>}/>
              <Route path="/Notverified" element={<Notverified/>}/>
              <Route path="/SellerOrder" element={<SellerOrder/>}/>
              <Route path="/ChangePassword" element={<ChangePasswordSeller/>}/>
              <Route path="*" element={<SellerHome/>}/>
            </>
            :
              <>
              <Route path="/Signup" element={<SignupPage/>}/>
              <Route path="/verify/:token" element={<MailVerify/>}/>
              <Route path="/Notverified" element={<Notverified/>}/>
              <Route path="/Forgot" element={<Forgot/>}/>
              <Route path="/Forgotmail" element={<Forgotmail/>}/>
              <Route path="/ForgotPass/:username" element={<ChangePassword setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route exact path="*" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
              </>
          }
          </>
        }
        
        
        
        
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/navbar/Navbar";
const ChangePassword=()=>{
    const [showPass,setShowPassword]=useState('Password');
    const navigate=useNavigate();
    const [validationErr,setValidationErr]=useState([false,false,false,false,false]);
    const [setPass,setPassValue]=useState({
        newpassword:'',
        changepassword:'',
    })
    let len_flag=false;
    let cap_flag=false;
    let low_flag=false;
    let num_flag=false;

    const handler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setPassValue({...setPass,[name]:value})
      }
    const UpdatePass=()=>{
        console.log("hello");
        if(setPass.newpassword===setPass.changepassword){
            if (setPass.newpassword.length >= 8) {
                    len_flag=true;
            }
            for (let i = 0; i < setPass.newpassword.length; i++) {
                if (setPass.newpassword[i] >= 'A' && setPass.newpassword[i] <= 'Z') {
                    cap_flag=true;
                }
                if (setPass.newpassword[i] >= 'a' && setPass.newpassword[i] <= 'z') {
                    low_flag=true;
                }
                if (setPass.newpassword[i] >= 0 && setPass.newpassword[i] <= 9) {
                    num_flag=true;
                }
            }
            if(len_flag && cap_flag && low_flag && num_flag){
                let token=localStorage.getItem("token");
                fetch("http://localhost:3000/updateUser",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({token,data:setPass}),
                }).then((res)=>{
                    if(res.status===200){
                        setValidationErr([false,false,false,false,false])
                        navigate('/');
                    }
                })
            }else{
                setValidationErr([len_flag,cap_flag,low_flag,num_flag,false]);
            }
        }else{
            setValidationErr([false,false,false,false,true]);
        }
    }
    const showPassword=()=>{
        if(showPass==='Password'){
            setShowPassword('Text');
        }else{
            setShowPassword('Password');
        }
    }

    return (
        <>
        <NavigationBar/>
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '92vh',background:'gray'}}>
        <div className="container bg-light">
            <div className="row pl-3 pt-3">
                <h6>Change your account login details</h6>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-11">The password has to be . . . . </div>
                <div className="col-10">
                    {validationErr[0]?<li style={{color: 'red'}}>Minimum 8 characters long</li>:<li style={{color: 'gray'}}>Minimum 8 characters long</li>}
                    {validationErr[1]?<li  style={{color: 'red'}}>One UpperCase letter at least</li>:<li style={{color: 'gray'}}>One UpperCase letter at least</li>}
                    {validationErr[2]?<li  style={{color: 'red'}}>One Lowercase letter at least</li>:<li style={{color: 'gray'}}>One Lowercase letter at least</li>}
                    {validationErr[3]?<li  style={{color: 'red'}}>One Number</li>:<li style={{color: 'gray'}}>One Number</li>}
                </div>
                <div className="col-10 pb-3">
                    <input className="mt-2" type={showPass} id="newpass" placeholder="New password" value={setPass.newpassword} onChange={handler} name="newpassword"
                        style={{width: '50%'}} required/><br/>
                    <input className="mt-2 a" type={showPass} id="confirmpass" placeholder="Confirm password"
                        name="changepassword" style={{width: '50%'}} value={setPass.changepassword} onChange={handler}  required/><br/>
                        <input type="checkbox" id="p" onClick={showPassword}/><label className="ml-2" htmlFor="p"> Show Password</label><br/>
                    <div className="mt-2" id="show">{validationErr[4]?<li style={{color: 'red'}}>Password not match</li>:""}</div>
                    <div className="btn btn-warning mt-3" type="button" onClick={UpdatePass} >Update</div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default ChangePassword;
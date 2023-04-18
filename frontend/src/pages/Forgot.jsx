import react, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Forgot=()=>{
    const [username,setUserName]=useState("");
    const [error,setError]=useState("")
    const navigate=useNavigate();
    const validation=()=>{
        let obj = { "username": username };
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/checkuser");
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200){
                let data=JSON.parse(this.responseText);
                if(data.username==username){
                    navigate('/Forgotmail');
                }else{
                    console.log("hello")
                    setError("User Not Found");
                    setUserName(""); 
                }
            }
        }
        request.send(JSON.stringify(obj));
        
    }
    return<>
        <div className="container-fluid bg-dark d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="container bg-light">
                <div className="row pt-3 d-flex justify-content-center align-items-center text-center">
                    <h1>Forgot Password</h1>
                </div>
                <div className="row d-flex justify-content-center align-items-center text-center">
                    <div className="col-10 pb-3 mt-3">
                        <input className="mt-2" type="text" id="u_name" placeholder="Enter username" name="user_name"
                            style={{width: "50%"}} value={username} onChange={(e)=>{setUserName(e.target.value)}} required/><br/>
                    </div>
                    <div className="col-5 pb-3">
                        <div className="mt-2" style={{color:'red'}}>{error}</div>
                        <div className="btn btn-warning" type="button" onClick={validation}>Reset Password</div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Forgot;
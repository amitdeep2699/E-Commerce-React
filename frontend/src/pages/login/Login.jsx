import React, { useState,useContext } from "react";
// import NavigationBar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = ({setIsLoggedIn}) => {
  const [userLogin, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate=useNavigate();
  // const setIsLoggedIn=useContext(isLoggedIn);
  // const setIsPendding=useContext(isPadding); 
  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({ ...userLogin, [name]: value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const newForm = { ...userLogin };
    setLogin({
      username: "",
      password: "",
    });
    fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForm),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem('token',data.token);
        localStorage.setItem('username',data.username);
        navigate('/');
        setIsLoggedIn(true);
      })
      .catch((err) => {
        if(err.status===401){
          err.json()
          .then((data)=>{
            setError(data.error);
          })
        }
        else{
          console.log("Something wrong at login");
        }
      });
  };
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center text-white"
        style={{ height: "100vh",backgroundImage: `url("http://localhost:3000/login2.jpg")`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}
      >
        <div className="row w-50" bg="dark">
          <form action="" onSubmit={formSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>User Name</label>
              <input
                value={userLogin.username}
                type="text"
                className="form-control"
                placeholder="Enter email"
                name="username"
                onChange={handler}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                value={userLogin.password}
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handler}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-right text-center mt-2">
              Don't have an account ?{"  "}
              <Link to="/Signup" style={{ textDecoration: "none",color:'red' }}>
                Sign UP
              </Link>
            </p>
            <p className="forgot-password text-center">
              <Link to='/Forgot' style={{ textDecoration: "none",color:"red" }}>
              Forgot password?
              </Link>
            </p>
          </form>
          <div className="text-center">
            <span style={{ color: "red" }}>{error}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;

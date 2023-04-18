import React ,{useState} from "react";
import { Link ,useNavigate} from "react-router-dom";
const SignupPage=()=>{
    const [userSignup,setSignup]=useState({ name:"", username:"", mobile:"", password:"", email:"",isSeller:"user"});
    let [name_err,setNameError]=useState("");
    let [username_err,setUserNameError]=useState("");
    let [mobile_err,setMobileError]=useState("");
    let [showType,setShowType]=useState("password");
    const navigate=useNavigate();
    const handler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setSignup({...userSignup,[name]:value})
        // console.log(name,value);
    }
    const showPassword=()=>{
        if(showType=='password'){
            setShowType('text');
        }else{
            setShowType('password');
        }
    }
    const formSubmit=(e)=>{
        e.preventDefault();
        const newForm={...userSignup};
        setSignup({ name:"", username:"", mobile:"", password:"", email:"",isSeller:"user"})
        fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newForm)
        })
        .then((res) =>{
            if(res.status!==200){
                return res.json();
            }else{
                navigate("/Notverified");
            }
        })
        .then((data)=>{
            setNameError(data.name);
            setMobileError(data.mobile);
            setUserNameError(data.username);
            // console.log(data)
            // setError(data.error);
        }).catch((err)=>{
            console.log(err);
            throw new Error(res.status);
        });
    }
    return(
        <>
        <div className="container-fluid" style={{height: "100vh",backgroundImage: `url("http://localhost:3000/signup1.jpg")`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
            <div className="row  d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <div className="col-md-6 col-lg-4 text-white bg-dark" style={{borderRadius: "1rem"}}>
                    <div className="col-12 m-1 text-center">
                        <div className="col-12">
                            <h2 className="fw-bold mb-2 text-uppercase">SignUp</h2>
                        </div>
                        <div className="col-12">
                            <form action="" onSubmit={formSubmit}>
                                <div className="text-yellow mb-2">
                                    <input type="radio" name="isSeller" id="user" value="user" onChange={handler} defaultChecked/>
                                    <label className="form-label mr-md-3" htmlFor="user">User</label>
                                    <input type="radio" name="isSeller" id="user" value="seller"  onChange={handler}/>
                                    <label className="form-label" htmlFor="user">Seller</label>
                                </div>
                                <div className="form-outline form-white mb-2">
                                    <input type="text" name="name" placeholder="Name" id="typename" className="form-control form-control-lg" value={userSignup.name} onChange={handler} required/>
                                    <label className="form-label" htmlFor="typename">
                                        {
                                            name_err===""?"Name":<span style={{color:"red"}}>{name_err}</span>
                                        }
                                    </label>
                                </div>
                                <div className="form-outline form-white mb-2">
                                    <input type="text" name="username" placeholder="Username" id="typeuname" className="form-control form-control-lg" value={userSignup.username} onChange={handler} required/>
                                    <label className="form-label" htmlFor="typeuname">
                                        {
                                            username_err===""?"UserName":<span style={{color:"red"}}>{username_err}</span>
                                        }
                                    </label>
                                </div>
                                <div className="form-outline form-white mb-2">
                                    <input type="email" placeholder="E-mail" name="email" id="typeEmail" className="form-control form-control-lg" value={userSignup.emial} onChange={handler} required/>
                                    <label className="form-label" htmlFor="typeEmail">E-mail</label>
                                </div>
                                <div className="form-outline form-white mb-2">
                                    <input type="text" name="mobile" placeholder="Mobile" id="mobile" className="form-control form-control-lg" value={userSignup.Mobile}  onChange={handler} required/>
                                    <label className="form-label" htmlFor="mobile">
                                        {
                                            mobile_err===""?"Mobile":<span style={{color:"red"}}>{mobile_err}</span>
                                        }
                                    </label>
                                    
                                </div>
                                <div className="form-outline form-white mb-2">
                                    <input type={showType} placeholder="Password" name="password" id="typePasswordX" className="form-control form-control-lg" value={userSignup.password}  onChange={handler} required/>
                                    <label className="form-label" htmlFor="typePasswordX">Create Password</label><br/>
                                    <input type="checkbox" id="p" onClick={showPassword}/><label className="ml-2" htmlFor="p"> Show
                                        Password</label>
                                </div>
                                <div>
                                    
                                </div>
                                <input className="btn btn-primary btn-outline-light btn-lg px-4" type="submit" value="Submit"/>
                            </form>
                        </div>
                        <div className="col-12">
                            <p className="mt-2">Already have an account? <Link to="/" style={{textDecoration:"none"}}>SignIn</Link></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default SignupPage;
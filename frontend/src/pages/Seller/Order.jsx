import React, { useState,useEffect } from "react";
import NavigationBar from "../../components/navbarSeller/Navbar";
const Order=()=>{
    const [username,setusername]=useState();
    const [AllProduct,setAllProduct]=useState([]);
    useEffect(()=>{
        let token=localStorage.getItem("token");
        fetch("http://localhost:3000/getAllSellerOrderData",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token:token}),
        })
        .then((res) => {
            if (res.status !== 200) {
            throw res;
            } else {
            return res.json();
            }
        })
        .then((data) => {
            if(data.length!=0){
                setusername(data.username);
                data=data.data;
                setAllProduct([...data]);
                console.log(data);
            }
        })
        .catch((err) => {
            if(err.status===401){
                err.json()
                .then((data)=>{
                    if(data.error==='unauthorized' || data.error==='/fail'){
                        window.Location.href='/';
                    }else if(data.error==='NotVerified'){
                        window.location.href='/Notverified'
                    }
                })
            }else{
                throw new Error(err.status);
            }
        });
    },[])
    
    return<>
        <NavigationBar/>
        <div className="container-fluid">
            <div className="container-fluid d-flex justify-content-center">
                <div className="row m-2 pb-2" style={{backgroundColor: 'white',borderRadius: '1rem' ,width: '90%',height: '77vh'}}>
                    <div className="col-12 mt-2 mb-2 font-weight-bold" style={{fontSize: '2rem'}}>Your Orders,
                        <span style={{color: '#a8729a'}}>
                            { username }
                        </span>
                    </div>
                    {
                        AllProduct.map((item,index)=>{
                            return <div  className="container-fluid" key={index} >
                                    <div className="card shadow-0 border ml-1 mr-1 mb-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    {
                                                        item.product_image[0]=='h'?<img className="img-fluid"  src={item.product_image} alt="Avtar"
                                                    style={{width: "100%", height: "150px"}}/>:<img className="img-fluid"  src={`http://localhost:3000/${item.product_image}`} alt="Avtar"
                                                    style={{width: "100%", height: "150px"}}/>
                                                        }
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 P_name">{item.name}</p>
                                                </div>
                                                <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small P_user">{item.user_name}</p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small P_quant">Qty: {item.order_qunatity}</p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0 small P_totalPrices">₹ {item.total_price}</p>
                                                </div>
                                            </div>
                                            <hr className="mb-4" style={{backgroundColor: '#e0e0e0' ,opacity: '1'}}/>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-2">
                                                    <p className="text-muted mb-0 small">Track Order</p>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="progress" style={{height: '6px', borderRadius: '16px'}}>
                                                        <div className="progress-bar" role="progressbar"
                                                            style={{width: '80%' ,borderRadius: '16px', backgroundColor: '#a8729a'}}
                                                            aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-around mb-1">
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                                                        <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    </>
}
export default Order;
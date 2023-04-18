import React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/navbarSeller/Navbar";
const ShowAllProduct = () => {
    const [AllProduct,setAllProduct]=useState([]);
    const [page,setPage]=useState(1);
    const [deleteItem,setdeleteItem]=useState(1);
    function handler(e,index){
        const name=e.target.name;
        const value=e.target.value;
        AllProduct[index][name]=value;
        setAllProduct([...AllProduct])
    }
    function nextPage(){
        setPage(page+1);
    }
    function prevPage(){
        if(page>1){
            setPage(page-1);
        }
    }
    useEffect(()=>{
        let token=localStorage.getItem("token");
        fetch("http://localhost:3000/getSellerProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token,data:{limit: 10, page: page }}),
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
                setAllProduct([...data]);
            }else{
                setPage(page-1);
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
    }, [page,deleteItem]);
    const updateProduct=(e,index)=>{
        e.preventDefault();
        let token=localStorage.getItem("token");
        fetch('http://localhost:3000/updateSellerProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token,data:AllProduct[index]}),
        }).then((res)=>{
            console.log(res.status);
        })
    }
    const deleteProduct=(index)=>{
        let token=localStorage.getItem("token");
        fetch('http://localhost:3000/deleteSellerProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token,data:AllProduct[index]}),
        }).then((res)=>{
            console.log(res.status);
            setdeleteItem(deleteItem+1);
        })
    }
    return <>
    <NavigationBar/>
    <div className="container-fluid" id="main">
        {
            AllProduct.map((item,index)=>{
               return( <form key={index} onSubmit={(Event)=>updateProduct(Event,index)} >
                    <div className="row justify-content-center align-items-center border mt-2 p-2 bg-dark">
                        <div className="col-sm-4">
                            {item.product_image[0] == "h" ? (
                                <img
                                className="mt-2"
                                src={item.product_image}
                                alt="Avtar"
                                style={{height: "200px",width: "200px"}}
                                />
                            ) : (
                                <img
                                className="mt-2"
                                src={`http://localhost:3000/${item.product_image}`}
                                alt="Avtar"
                                style={{height: "200px",width: "200px"}}
                                />
                            )
                            }
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="product_name" className="text-white" style={{fontSize: "large"}}>Product
                                Name:</label><input className="P_name mb-1 mx-2" type="text" name="name" id="product_name"
                                placeholder="Enter Product Name" style={{width: "50%"}} value={item.name} onChange={(Event)=>handler(Event,index)} required/><br/>
                            <label htmlFor="prices" className="text-white" style={{fontSize: "large"}}>Prices ₹ :</label><input
                                className="P_prices mb-1 mx-5" type="number" min="0" step="0.01" name="prices" id="prices"
                                placeholder="Prices" style={{width: "50%"}} value={item.prices} onChange={(Event)=>handler(Event,index)} required /><br/>
                            <label htmlFor="seller" className="text-white" style={{fontSize: "large"}}>Seller Name:</label><input
                                className="P_seller mb-1 mx-3" type="text" name="seller_name" id="seller" placeholder="seller Name"
                                style={{width: "40%"}} value={item.seller_name} onChange={(Event)=>handler(Event,index)} required  readOnly/><br/>
                            <label htmlFor="quant" className="text-white" style={{fontSize: "large"}}>Quantity :</label><input className="P_quantity mb-2 mx-4"
                                type="number" min="0"  step="1" name="quantity" id="quant" placeholder="Quantity"
                                style={{width: "15%"}} value={item.quantity} onChange={(Event)=>handler(Event,index)} required /><br/>
                            <label className="text-white" style={{fontSize: "large"}}>Descripation :</label>
                            <textarea className="P_desc mt-2 mx-1" name="description" id="description"
                                style={{width: "50%",height: "20%"}} value={item.description} onChange={(Event)=>handler(Event,index)} required></textarea>
                        </div>
                        <div className="col-sm-1 mx-3">
                            <div className="P_button row justify-content-center"><input className="btn btn-success" type="submit"
                                    value="Update" />
                                <div className="btn btn-danger mt-3 delete" onClick={()=>deleteProduct(index)}>Delete</div>
                            </div>
                        </div>
                    </div>
                </form>
               )
            })
        }
        <div className="row justify-content-evenly my-2">
            <div className="col-1">
                <button className="btn btn-warning" onClick={prevPage}>Prev</button>
            </div>
            <div className="col-1">
                <button className="btn btn-warning" onClick={nextPage}>Next</button>
            </div>
        </div>
    </div>
    </>
};
export default ShowAllProduct;

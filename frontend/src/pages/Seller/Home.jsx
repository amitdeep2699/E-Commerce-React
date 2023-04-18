import React, { useRef } from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/navbarSeller/Navbar";
const Home = () => {
    const updateMessage='Added successfully'
    const errorMessage='Some thing went wrong.. try again'
    const [Index,setIndex]=useState();
    const imgRef=useRef();
    const [productData,setProductData]=useState({
        image: "",
        product_name: "",
        price: "",
        description: "",
        seller: "",
        quantity:""
    })
    const handler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setProductData({...productData,[name]:value})
      }
    const imageHandler=(event) => {
        const name=event.target.name;
        const value=event.target.files[0];
        setProductData({...productData,[name]:value});
    }
    function setMassageTime(time){
        setTimeout(()=>{
            setIndex();
        },time)
      }
    const submitProduct=(e)=>{
        e.preventDefault();
        let token=localStorage.getItem("token");
        const formData = new FormData();
        formData.append('image',productData.image);
        formData.append('product_name',productData.product_name);
        formData.append('price',productData.price);
        formData.append('description',productData.description);
        formData.append('seller',productData.seller);
        formData.append('quantity',productData.quantity);
        formData.append('token',token);
        fetch('http://localhost:3000/addProductSeller', {
        method: 'POST',
        body: formData
        }).then((res)=>{
            if(res.status===200){
                setIndex(0);
            }else{
                setIndex(1);
            }
            setProductData({
                image: "",
                product_name: "",
                price: "",
                description: "",
                seller: "",
                quantity:""
            })
            imgRef.current.value='';
            setMassageTime(800);
        })

    }
    return <>
    <NavigationBar/>
    <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{height:"90vh"}}>
            <div className="col-6 " style={{backgroundColor: "aqua"}}>
                    <form action="" encType="multipart/form-data" onSubmit={submitProduct}>
                            <div className="row text-center my-2">
                                <h4 style={{color: "brown"}}>Add Product</h4>
                            </div>
                            <label htmlFor="product_name" style={{fontSize: "large"}}>Product Name :</label>
                            <input className="mx-2 mb-2"
                                type="text" name="product_name" id="product_name" placeholder="Enter Product Name"
                                style={{width: "50%"}} value={productData.product_name} onChange={handler} required/><br/>
                            <label htmlFor="prices" style={{fontSize: "large"}}>Prices ₹ :</label><input className="mx-5 mb-2"
                                type="number" min="0"  step="0.01" name="price" id="prices" placeholder="Prices"
                                style={{width: "50%"}} value={productData.price} onChange={handler} required /><br/>
                            <label htmlFor="quant" style={{fontSize: "large"}}>Quantity :</label><input className="mx-5 mb-2"
                                type="number" min="0"  step="1" name="quantity" id="quant" placeholder="Quantity"
                                style={{width: "50%"}} value={productData.quantity} onChange={handler} required/><br/>
                            <label style={{fontSize: "large"}}>Descripation :</label>
                            <textarea className="mx-3 mb-2"
                                name="description" id="description" style={{width: "50%",height: "20%"}}
                                value={productData.description} onChange={handler}
                                required></textarea>
                            <br/>
                            <label style={{fontSize: "large"}}>Add Product Img :</label><input className="mx-2" type="file"
                                name="image" id="image" accept="image/*" style={{width: "50%",height: "20%"}} ref={imgRef} onChange={imageHandler} required /><br/>
                            <div className="row justify-content-center mt-1" id="show" style={{color: "red"}}></div><br/>

                            { Index==1?<><div className="d-flex justify-content-center"><span style={{background:'red',color:'yellow'}}>{errorMessage}</span></div><br/></>:''}
                            { Index==0?<><div className="d-flex justify-content-center"><span style={{background:'green',color:'yellow'}}>{updateMessage}</span></div><br/></>:''}
                            
                            <div className="row justify-content-center">
                                <div className="col-1">
                                    <input className="btn btn-warning" type="submit"
                                        value="Submit"/>
                                </div>
                            </div>
                            <br/>
                    </form>                
            </div>
        </div>
    </div>
    </>
};
export default Home;

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/navbar/Navbar";
const Cart = () => {
  const [products, setPorducts] = useState([]);
  const [maxQuant,setMaxQuant]=useState();
  const [Index,setIndex]=useState();
  const [page,setPage]=useState(1);
  const [totalItems,setTotalItems]=useState(0);
  const [totalPrice,setTotalPrice]=useState(0);
  const navigate=useNavigate();
  function incFun(i){
    let token=localStorage.getItem("token");
    // console.log(token);
    fetch("http://localhost:3000/updateCartQuantity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token,id:products[i].product_id, msg:"inc"}),
    })
    .then((res)=>{
        if(res.status===200){
            return res.json();
        }else{
            throw res;
        }
    }).then((data)=>{
        if(data.msg==="maxquant"){
            setIndex(i);
            setMaxQuant(`Only ${data.quant} is Available`);
        }else{
            setIndex();
            let value=products[i].cart_quantity;
            products[i].cart_quantity=parseInt(value)+1;
            setTotalPrice(totalPrice+products[i].prices);
            setPorducts([...products]);
        }
    }).catch((err)=>{
        throw err;
    })
  }
  function decFun(i){
    let value=products[i].cart_quantity;
    let token=localStorage.getItem("token");
    if(value>1){
        fetch("http://localhost:3000/updateCartQuantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token,id:products[i].product_id, msg:"desc"}),
        })
        .then((res)=>{
            if(res.status===200){
                return res.json();
            }else{
                throw res;
            }
        }).then((data)=>{
            setIndex();
            products[i].cart_quantity=parseInt(value)-1;
            setTotalPrice(totalPrice-products[i].prices);
            setPorducts([...products]);
        }).catch((err)=>{
            throw err;
        })
    }else{
        setIndex(i);
        setMaxQuant(`Quantity Must Be grater then 1`);
    }
  }
  function deleteFun(i){
    let token=localStorage.getItem("token");
    fetch("http://localhost:3000/deleteCartData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token:token,data:{id:products[i].product_id} }),
    }).then((res)=>{
        if(res.status===200){
            setPorducts(
                products.filter((item,index)=>{
                    return index!==i;
                })
            )
            setTotalItems(totalItems-1);
        }
    })
  }
  const pay = async (prices,callback) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/payment");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var orderData = JSON.parse(xhr.responseText);
              var options = {
                  "key": "rzp_test_8p9QtGbIoUc92r",
                  "amount": `${prices*100}`,
                  "currency": "INR",
                  "order_id": orderData.id,
                  "handler": function (response) {
                      callback(response.razorpay_payment_id);
                  }
              };
              var rzp1 = new Razorpay(options);
              rzp1.open();
          }
      };
      xhr.send(JSON.stringify({ amount: 50000, currency: "INR" }));
  }

  const checkOut= async()=>{
        let token=localStorage.getItem("token");
        let request = new XMLHttpRequest();
        if (products.length > 0) {
          request.open("POST", "http://localhost:3000/checkOutBeforPay", true);
          request.setRequestHeader("Content-Type", "application/json");
          request.onreadystatechange = async function () {
              if (this.readyState == 4 && this.status == 200) {
                  let price=JSON.parse(this.responseText);
                  console.log(price);
                  await pay(price.t_prices,(data)=>{
                      if(data){
                          request.open("POST", "http://localhost:3000/checkOut", true);
                          request.setRequestHeader("Content-Type", "application/json");
                          request.onreadystatechange = function () {
                              if (this.readyState == 4 && this.status == 200) {
                                  if(this.responseText=="fail"){
                                      alert("Something Went wrong payment return within 24h");
                                  }else{
                                      navigate('/UserOrder');
                                  }
                              }
                          }
                          let obj={token,pay_id:data};
                          request.send(JSON.stringify(obj));
                      }
                  })
              }
          }
          request.send(JSON.stringify({token}));
      } else {
          alert("Add product then CheckOut!!!");
      }
  }

  useEffect(() => {
    let token=localStorage.getItem("token");
    fetch("http://localhost:3000/getAllCartData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token:token,limit: 10, page: page }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTotalItems(data.data.length);
        if(data.length!=0){
            setPorducts([...data.data]);
            setTotalPrice(data.total);
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
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container-fluid d-flex justify-content-center">
            <div className="row m-5 pb-2" id="main" style={{backgroundColor: 'white',borderRadius: '1rem',width: '80%',height: '60vh',overflowY: 'scroll'}}>
                <div className="col-12 mt-3 mb-3 font-weight-bold">Shopping Cart</div>
                  {
                    products.map((item, index) =>{
                      return <>
                            <div className="container-fluid mb-2 main_div" key={index}>
                            <div className="row" >
                                <div className="col-4">
                                    {item.product_image[0] == "h" ? (
                                      <img
                                        className="mt-2"
                                        src={item.product_image}
                                        alt="Avtar"
                                        style={{ width: "150px", height: "150px" }}
                                      />
                                    ) : (
                                      <img
                                        className="mt-2"
                                        src={`http://localhost:3000/${item.product_image}`}
                                        alt="Avtar"
                                        style={{ width: "150px", height: "150px" }}
                                      />
                                    )}
                                </div>
                                <div className="col-4">
                                    <h5>{item.name}</h5>
                                    {
                                      Index===index?<div className="msg mb-2" style={{color:"red"}}>{maxQuant}</div>:<></>
                                    }
                                </div>
                                <div className="col-2 d-flex">
                                    <div className="btn btn_minus  mr-3" style={btns_style} onClick={()=>decFun(index)}>-</div>
                                    <div className="quant">{item.cart_quantity}</div>
                                    <div className="btn btn_plus ml-3" style={btns_style} onClick={()=>incFun(index)}>+</div>
                                </div>
                                <div className="col-2 text-center">
                                    <div className="price font-weight-bold">Prices: {(item.prices).toFixed(2)}</div>
                                    <div className="btn-danger" style={btn_delete_style} onClick={()=>deleteFun(index)}>Remove</div>
                                </div>
                            </div>
                        </div>
                      </>
                    })
                }

            </div>
        </div>
        <div className="container-fluid d-flex justify-content-center">
            <div className="row m-0" style={{borderRadius: '1rem',width: '80%'}}>
                <hr/>
                <div className="col-9"></div>
                <div className="col-2">
                    <div id="items">Total items: {totalItems}</div>
                    <div id="total-amount" className="font-weight-bold">Total Prices: {totalPrice.toFixed(2)}</div>
                </div>
                <div className="col-1">
                    <div id="checkOut" className="btn btn-warning" onClick={checkOut}>Checkout</div>
                </div>
            </div>
        </div>
    </>
  );
};
export default Cart;

const btns_style={
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#d9d9d9',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  fontFamily: 'Open Sans',
  fontWeight: '900',
  color: '#202020',
  cursor: 'pointer'
}
const btn_delete_style={borderRadius: '1rem',
  cursor: 'pointer',backgroundColor:'brown',color:'white'}
import React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../../components/navbar/Navbar";
const UserHome = () => {
  const [products, setPorducts] = useState([]);
  const [page,setPage]=useState(1);
  const [Index,setIndex]=useState();
  const addedSuccessMsg="Added Successfuly"

  function nextPage(){
    setPage(page+1);
  }
  function prevPage(){
    if(page>1){
      setPage(page-1);
    }
  }
  function setMassageTime(time){
    setTimeout(()=>{
      setIndex();
    },time)
  }
  function addToCart(i){
    let token=localStorage.getItem("token");
    fetch("http://localhost:3000/addToCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token:token,data:{product_id:products[i].product_id,seller_name:products[i].seller_name}}),
    }).then((res)=>{
      if(res.status===200){
        return res.json();
      }else{
        return res;
      }
    }).then((data)=>{
      setIndex(i);
      setMassageTime(800);
    })

  }
  useEffect(() => {
    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit: 10, page: page }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if(data.length!=0){
            setPorducts([...data]);
        }else{
            setPage(page-1);
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error(res.status);
      });
  }, [page]);

  return (
    <>
      <NavigationBar />
      <div className="container" style={{ height: "100vh" }}>
        <div className="row row-cols-md-5 mt-2 justify-content-center align-items-center">
            {
                products.map((item,index)=>{
                    return(
                        <div className="card mt-2 mb-2 ml-3" key={index}>
                          {
                            item.product_image[0]=='h'?<img className="mt-2" src={item.product_image} alt="Avtar"
                            style={{width: "100%", height: "150px"}}/>:<img className="mt-2" src={`http://localhost:3000/${item.product_image}`} alt="Avtar"
                            style={{width: "100%", height: "150px"}}/>
                          }
                            <div className="container">
                                <h4>{item.name}</h4>
                                <p className="price">₹ {item.prices}</p>
                                <p>{item.description}</p>
                            </div>
                            {
                                Index===index?<p className="massage" style={{color:"yellow",background:"gray"}}>{addedSuccessMsg}</p>:<></>
                            }
                            <div className="d-flex justify-content-between mb-1 pl-2 pr-2">
                                <div className="btn btn_delete btn-primary" onClick={()=>addToCart(index)}>Add To Cart</div>
                            </div>
                        </div>
                  )
                })
            }
        </div>
        <div className="row justify-content-evenly">
            <div className="col-1">
                <button className="btn btn-warning" onClick={prevPage}>Prev</button>
            </div>
            <div className="col-1">
                <button className="btn btn-warning" onClick={nextPage}>Next</button>
            </div>
        </div>
      </div>
    </>
  );
};
export default UserHome;

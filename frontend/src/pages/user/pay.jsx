import React from "react";
import 'https://checkout.razorpay.com/v1/checkout.js';
const pay=()=>{
    const payment=async(e)=>{
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/payment");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var orderData = JSON.parse(xhr.responseText);
                var options = {
                    "key": "rzp_test_8p9QtGbIoUc92r",
                    "amount": "500",
                    "currency": "INR",
                    "order_id": orderData.id,
                    "handler": function (response) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            }
        };
        xhr.send(JSON.stringify({ amount: 50000,
        currency: "INR"}));
}
return<>
<h1>Hello payment</h1>
<button onClick={payment}>Pay</button>
</>

}
export default pay;
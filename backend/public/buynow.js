let start = 0, end = 0;
let products = [];
let request = new XMLHttpRequest();
// let page = 1, limit = 10;
let total_price = 0;
let count_no_items = 0;
let len = 0;
function getCartData() {
    request.open("GET", "/getAllCartData", true);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);
            len = products.length;
            count_no_items = len;
            if (len > 0) {
                load(0, len - 1)
            }
        }
    }
    request.send();
}
getCartData();

const pay = async (prices,callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/payment");
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
};


let checkOut = document.getElementById("checkOut");
checkOut.addEventListener("click", async (e) => {
    if (len > 0) {
        request.open("GET", "/checkOutBeforPay", true);
        request.onreadystatechange = async function () {
            if (this.readyState == 4 && this.status == 200) {
                let price=JSON.parse(this.responseText);
                console.log(price);
                await pay(price.t_prices,(data)=>{
                    if(data){
                        request.open("POST", "/checkOut", true);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                if(this.responseText=="fail"){
                                    alert("Something Went wrong payment return within 24h");
                                }else{
                                    window.location.href = '/myOrder';
                                }
                            }
                        }
                        let obj={pay_id:data};
                        request.send(JSON.stringify(obj));
                    }
                })
            }
        }
        request.send();
    } else {
        alert("Add product then CheckOut!!!");
    }
})

function Delete(id) {
    request = new XMLHttpRequest();
    request.open("POST", "/deleteCartData", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // load(start,end);
        }
    }
    request.send(JSON.stringify({ id: id }));
}

function updateCartQuantity(id, msg, callback) {
    request = new XMLHttpRequest();
    request.open("POST", "/updateCartQuantity", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // callback(request.responseText);
            let data = JSON.parse(request.responseText);
            // console.log(data);
            callback(data.msg, data.quant);
        }
    }
    request.send(JSON.stringify({ id: id, msg: msg }));
}
function setTotalPrice() {
    let t_price = document.getElementById("total-amount");
    t_price.innerText = "Total Prices :₹ " + (total_price).toFixed(2)
}
function setCountItems() {
    let t_items = document.getElementById("items");
    t_items.innerText = "Total Items : " + count_no_items;
}

function creatingCard(products) {
    let temp = document.getElementById("sample");
    let copyHTML = temp.content.cloneNode(true);
    copyHTML.querySelector("img").src = products.product_image;
    copyHTML.querySelector("h4").innerText = products.name;
    copyHTML.querySelector(".price").innerText = "Prices :₹ " + (products.cart_quantity * products.prices).toFixed(2);
    copyHTML.querySelector(".quant").innerText = products.cart_quantity;
    copyHTML.querySelector(".btn_plus").id = products.product_id;
    copyHTML.querySelector(".btn_minus").id = products.product_id;
    copyHTML.querySelector(".btn_delete").id = products.product_id;
    copyHTML.querySelector(".popupdetail").innerText = products.description;
    let btn_plus = copyHTML.querySelector(".btn_plus");
    let btn_minus = copyHTML.querySelector(".btn_minus");
    let quant_val = copyHTML.querySelector(".quant");
    let DeleteCard = copyHTML.querySelector(".btn_delete");
    let main_div = copyHTML.querySelector(".main_div");
    let massage = copyHTML.querySelector(".msg");
    let price = copyHTML.querySelector(".price");
    total_price += (products.cart_quantity * products.prices);
    btn_plus.addEventListener("click", function () {
        updateCartQuantity(this.id, "inc", (msg, quant) => {
            if (msg == 'maxquant') {
                massage.style.display = "block";
                massage.innerText = 'This Product available only ' + quant;
            }
            else {
                massage.style.display = "none";
                let value = quant_val.textContent;
                value++;
                quant_val.innerText = value
                price.innerText = "Prices :₹ " + (value * products.prices).toFixed(2);
                total_price += products.prices;
                setTotalPrice();
            }
        });
    })
    btn_minus.addEventListener("click", function () {
        let value = quant_val.textContent;
        if (value > 1) {
            massage.style.display = "none";
            updateCartQuantity(this.id, "desc", (msg, quant) => {
                value--;
                quant_val.innerText = value;
                price.innerText = "Prices :₹ " + (value * products.prices).toFixed(2);
                total_price -= products.prices;
                setTotalPrice();
            });
        } else {
            massage.style.display = "block";
            massage.innerText = "Quantity must be greater than 1"
            value = 1;
            quant_val.innerText = '1';
        }
    })
    DeleteCard.addEventListener("click", function () {
        Delete(this.id);
        let value = quant_val.textContent;
        total_price -= (value * products.prices).toFixed(2);
        main_div.remove();
        count_no_items -= 1;
        setTotalPrice();
        setCountItems();
    })
    document.getElementById('main').appendChild(copyHTML);
}
function load(start, end) {
    for (let i = start; i <= end; i++) {
        creatingCard(products[i]);
    }
    setTotalPrice();
    setCountItems();
}






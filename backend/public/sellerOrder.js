let start = 0, end = 0;
let orders = [];
let request = new XMLHttpRequest();
let total_price=0;
let count_no_items=0;
let len=0;
function getCartData() {
    request.open("GET", "/getAllSellerOrderData", true);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            orders = JSON.parse(this.responseText);
            len = orders.length;
            count_no_items=len;
            if (len > 0) {
                load(0, len - 1)
            }
        }
    }
    request.send();
}
getCartData();


function creatingCard(orders){
    let temp = document.getElementById("sample");
    let copyHTML = temp.content.cloneNode(true);
    console.log(orders);
    copyHTML.querySelector("img").src = orders.product_image;
    copyHTML.querySelector(".P_name").innerText = orders.name;
    copyHTML.querySelector(".P_totalPrices").innerText = "Total Prices :₹ " + (orders.total_price).toFixed(2);
    copyHTML.querySelector(".P_user").innerText = orders.user_name;
    copyHTML.querySelector(".P_quant").innerText = "Qyt : "+ orders.order_qunatity;
    document.getElementById('main').appendChild(copyHTML);
}
function load(start, end) {
    for (let i = start; i <= end; i++) {
        creatingCard(orders[i]);
    }
}




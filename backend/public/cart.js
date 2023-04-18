let start = 0, end = 0;
let products = [];
let request = new XMLHttpRequest();
let page = 1, limit = 10;
function getCartData() {
    request.open("POST", "/getCartData", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);
            len = products.length;
            checkforbutton();
            if (len > 0) {
                load(0, len - 1)
            }
            // if(products.length>=5){
            //     end = 4;
            //     checkforbutton();
            //     load(0, 4);
            // }else {
            //     end = products.length - 1;
            //     checkforbutton();
            //     load(0, products.length - 1);

            // }
        }
    }
    request.send(JSON.stringify({ page: page, limit: limit }));
}
getCartData(page);
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

function creatingCard(products) {
    let temp = document.getElementById("sample");
    let copyHTML = temp.content.cloneNode(true);
    copyHTML.querySelector("img").src = products.product_image;
    copyHTML.querySelector("h4").innerText = products.name;
    copyHTML.querySelector(".price").innerText = "Prices :₹ " + products.prices;
    copyHTML.querySelector(".quant").innerText = products.cart_quantity;
    copyHTML.querySelector(".btn_plus").id = products.product_id;
    copyHTML.querySelector(".btn_minus").id = products.product_id;
    copyHTML.querySelector(".btn_delete").id = products.product_id;
    copyHTML.querySelector(".popupdetail").innerText = products.description;
    let btn_plus = copyHTML.querySelector(".btn_plus");
    let btn_minus = copyHTML.querySelector(".btn_minus");
    let quant_val = copyHTML.querySelector(".quant");
    let popupdiv = copyHTML.querySelector(".popupdiv");
    let DeleteCard= copyHTML.querySelector(".btn_delete");
    let card=copyHTML.querySelector(".card");
    let massage=copyHTML.querySelector(".msg");
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
            });
        } else {
            massage.style.display = "block";
            massage.innerText = "Quantity must be greater than 1"
            value = 1;
            quant_val.innerText = '1';
        }
    })
    popupdiv.addEventListener("click", (event) => {
        var pop = document.getElementsByClassName("popup");
        for (var i = 0; i < pop.length; i++) {
            if(pop[i]==event.target){
                continue;
            }
            pop[i].lastChild.classList.remove("show");
        }
        popupdiv.lastChild.classList.toggle("show");
    })
    DeleteCard.addEventListener("click", function () {
        Delete(this.id);
        card.remove();
    })
    document.getElementById('main').appendChild(copyHTML);
}
// function removeAll() {
//     const list = document.getElementById("main");

//     while (list.hasChildNodes()) {
//         list.removeChild(list.firstChild);
//     }
// }
function load(start, end) {
    // removeAll();
    for (let i = start; i <= end; i++) {
        creatingCard(products[i]);
    }
}
function checkforbutton() {
    let len = products.length;
    if (len < 10) {
        document.getElementById("next").style.display = "none";
    } else {
        document.getElementById("next").style.display = "block";
    }
}
function nextfive(event) {
    page = page + 1;
    getCartData(page);
    // event.preventDefault();
    // let len = products.length;
    // if (len - 1 >= end + 5) {
    //     start = end + 1;
    //     end = end + 5;
    // } else if (len - 1 != end) {
    //     start = end + 1;
    //     end = len - 1;
    // }
    // checkforbutton();
    // load(start, end);
    // return
}
// function prevfive(event) {
//     if(page>1){
//         page=page-1;
//         getCartData(page);
//     }
//     // event.preventDefault();
//     // let len = products.length;
//     // if (start > 5) {
//     //     end = start - 1;
//     //     start = start - 5;
//     // } else if (start > 0 && len > 5) {
//     //     start = 0;
//     //     end = 4;
//     // }
//     // else if (start > 0 && len > 5) {
//     //     start = 0;
//     //     end = len - 1;
//     // }
//     // checkforbutton();
//     // load(start, end);
//     // return
// }





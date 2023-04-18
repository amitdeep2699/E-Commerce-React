let start = 0, end = 0;
let products = [];
let page=1,limit=5;
let request = new XMLHttpRequest();
function getAllProduct(page){
    request.open("POST", "/product", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);
            len = products.length;
            if(len>0){
                load(0,len-1)
            }
            // if (products.length >= 5) {
            //     end = 4;
            //     checkforbutton();
            //     load(0, 4);
                
            // } else {
            //     end = products.length - 1;
            //     checkforbutton();
            //     load(0, products.length - 1);
                
            // }
        }
    }
    request.send(JSON.stringify({page:page,limit:limit}));
}
getAllProduct(page);
function printmassage(msg,time){
    let a=document.getElementById("dis");
    a.innerText=msg;
    a.style.color="yellow";
    setTimeout(()=>{
        let a=document.getElementById("dis");
        a.innerText="";
    },time)
}

function creatingCard(products) { 
    let temp=document.getElementById("sample");
    let copyHTML=temp.content.cloneNode(true);
    copyHTML.querySelector(".image").src=products.product_image;
    copyHTML.querySelector(".P_id").value=products.product_id;
    copyHTML.querySelector(".P_name").value=products.name;
    copyHTML.querySelector(".P_quantity").value=products.quantity;
    copyHTML.querySelector(".P_prices").value=products.prices;
    copyHTML.querySelector(".P_seller").value=products.seller_name;
    copyHTML.querySelector(".P_desc").value=products.description;
    copyHTML.querySelector(".P_button").id=products.product_id;
    copyHTML.querySelector(".delete").addEventListener('click',()=>{
        request.open("POST", "/deleteProduct", true);
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href='/adminShowAllProduct';
                
            }
        }
        request.send(JSON.stringify({product_id:products.product_id}));
    })
    document.getElementById('main').appendChild(copyHTML);
}
function removeAll() {
    const list = document.getElementById("main");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

// function checkforbutton(){
//     let len = products.length;
//     if(len-1==end){
//         document.getElementById("next").style.display="none";
//     }else{
//         document.getElementById("next").style.display="block";
//     }
//     if(start==0){
//         document.getElementById("prev").style.display="none";
//     }else{
//         document.getElementById("prev").style.display="block";
//     }
// }
function load(start, end) {
    removeAll();
    for (var i = start; i <= end; i++) {
        creatingCard(products[i]);
    }
}
function nextfive() {
    page=page+1;
    getAllProduct(page)
    // event.preventDefault();
    // if (products.length - 1 >= end + 5) {
    //     start = end + 1;
    //     end = end + 5;
    // } else if (products.length - 1 != end) {
    //     start = end + 1;
    //     end = products.length - 1;
    // }
    // checkforbutton();
    // load(start, end);
    // return
}
function prevfive() {
    if(page>1){
        page=page-1;
        getAllProduct(page);
    }
    // event.preventDefault();
    // if (start > 5) {
    //     end = start - 1;
    //     start = start - 5;
    // } else if (start > 0 && products.length > 5) {
    //     start = 0;
    //     end = 4;
    // }
    // else if (start > 0 && products.length > 5) {
    //     start = 0;
    //     end = products.length - 1;
    // }
    // checkforbutton();
    // load(start, end);
    // return
}

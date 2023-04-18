let start = 0, end = 0;
let products = [];
let request = new XMLHttpRequest();
let page=1,limit=10;
function getAllProduct(page)
{
    request.open("POST", "/product", true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText);
            len = products.length;
            if(len>0){
                checkforbutton();
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
    let card = document.createElement("div");
    card.setAttribute("class", "card mt-3 ml-3");

    let img = document.createElement("img");
    img.setAttribute("src", products.product_image);
    img.setAttribute("alt", "Avtar");
    img.style.width = "100%";
    img.style.height = "150px"

    let card_detail = document.createElement("div");
    card_detail.setAttribute("class", "container");

    card_detail.innerHTML = "<h4>" + products.name + "</h4>" + "<p> Prices :₹ " + products.prices + "</p>"

    card.appendChild(img);
    card.appendChild(card_detail);
    let popupdiv = document.createElement("div");
    popupdiv.setAttribute("class", "btn btn-info popup");
    popupdiv.addEventListener("click", () => {
        var flag = true;
        if (popupdiv.lastChild.getAttribute("class") == "popuptext") {
            flag = true;
        } else {
            flag = false;
        }
        var pop = document.getElementsByClassName("popup");
        for (var i = 0; i < pop.length; i++) {
            pop[i].lastChild.classList.remove("show");
        }
        if (flag) {
            popupdiv.lastChild.classList.toggle("show");
        } else {
            popupdiv.lastChild.classList.remove("show");
        }

    })
    popupdiv.innerText = "Details";
    let span_popup = document.createElement("span");
    span_popup.setAttribute("class", "popuptext")
    span_popup.innerText = products.description;
    popupdiv.appendChild(span_popup);

    let addToCard = document.createElement("div");
    addToCard.setAttribute("class", "btn btn-primary");
    addToCard.innerText = "Add To Cart"
    addToCard.setAttribute("id", products.product_id);
    addToCard.addEventListener("click", function () {
        let id = this.id;
        request.open("POST", "/addToCart");
        request.setRequestHeader("Content-type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                printmassage("Added To Cart",800);
                return
            }
        }
        request.send(JSON.stringify({product_id:id,seller_name:products.seller_name}));
    })
    let forbothbutton = document.createElement("div");
    forbothbutton.setAttribute("class", "d-flex justify-content-between m-1")
    forbothbutton.appendChild(addToCard);
    forbothbutton.appendChild(popupdiv);
    card.appendChild(forbothbutton);
    // <div class="popup" onclick="myFunction()">Click me to toggle the popup!
    // <span class="popuptext" id="myPopup">A Simple Popup!</span>
    // </div>
    document.getElementById("main").appendChild(card);

}
function removeAll() {
    const list = document.getElementById("main");

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function checkforbutton(){
    let len = products.length;
    if(len<10){
        document.getElementById("next").style.display="none";
    }else{
        document.getElementById("next").style.display="block";
    }
    if(page==1){
        document.getElementById("prev").style.display="none";
    }else{
        document.getElementById("prev").style.display="block";
    }
}
function load(start, end) {
    removeAll();
    for (var i = start; i <= end; i++) {
        creatingCard(products[i]);
    }
}
function nextfive(event) {
    page=page+1;
    getAllProduct(page);
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
function prevfive(event) {
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

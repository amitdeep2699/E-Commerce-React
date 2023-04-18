function checkspace(datatext) {
    for (var i = 0; i < datatext.length; i++) {
        if (datatext[i]!= " ") {
            return false;
        }
    }
    return true;
}
function setTime(t,msg){
    let show_error;
    if(msg=="file"){
        show_error=document.getElementById("show_file");
        show_error.innerText="Product uploaded Successfully";
    }else{
        show_error=document.getElementById("show");
        show_error.innerText="Product Added Successfully";
    }
    show_error.style.color="yellow";
    show_error.style.background="green";
    setTimeout(()=>{
        show_error.innerText="";
        show_error.style.background="light";
    },t)
}
let form = document.getElementById("form");
form.addEventListener('submit',onsubmitclick);
function onsubmitclick(event) {
    event.preventDefault();
    let product_name=document.getElementById("product_name");
    let prices=document.getElementById("prices");
    let description=document.getElementById("description");
    let show_error=document.getElementById("show");
    if(checkspace(product_name.value))
    {
        show_error.innerText="Product Name Are Require."
        form.reset();
        return;
    }
    else if(checkspace(description.value))
    {
        show_error.innerText="Description Require."
        form.reset();
        return;
    }
    let newform = new FormData(form);
    var request = new XMLHttpRequest();
    request.open("POST", "/addProduct");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            form.reset();
            setTime(2000,'from');
        }
    };
    request.send(newform);     
}


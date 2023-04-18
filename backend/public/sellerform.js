let form_file_seller=document.getElementById("form_file_seller");
form_file_seller.addEventListener('submit',onsubmitfileSeller);
function onsubmitfileSeller(event) {
    event.preventDefault();
    let newform = new FormData(form_file_seller);
    var request = new XMLHttpRequest();
    request.open("POST", "/addProductfileSeller");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            form.reset();
            setTimes(2000,"file",this.responseText);
        }
    };
    request.send(newform);     
}

function setTimes(t,msg,status){
    let show_error;
    if(msg=="file" && status=='success'){
        show_error=document.getElementById("show_file");
        show_error.innerText="Product uploaded Successfully";
        show_error.style.background="green";
    }
    else{
        show_error=document.getElementById("show_file");
        show_error.innerText="Product uploaded Fail, Sometime wrong in file";
        show_error.style.background="red";
    }
    show_error.style.color="yellow";
    
    setTimeout(()=>{
        show_error.innerText="";
        show_error.style.background="light";
    },t)
}
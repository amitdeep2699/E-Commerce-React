
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

let form_file=document.getElementById("form_file");
form_file.addEventListener('submit',onsubmitfile);
function onsubmitfile(event) {
    event.preventDefault();
    let newform = new FormData(form_file);
    var request = new XMLHttpRequest();
    request.open("POST", "/addProductfile");
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            form.reset();
            setTimes(2000,"file",this.responseText);
        }
    };
    request.send(newform);     
}

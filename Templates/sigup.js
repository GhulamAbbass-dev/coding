
const sigup=document.querySelectorAll("sigup")
const ema=document.querySelector('#Email');
const password=document.querySelector('#Password');
sigup.addEventListener('click',()=>{
    if(ema.value !== "" && password.value == ""){
         window.open('dashboard.html');
    }
    
})


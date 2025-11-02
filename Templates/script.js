const login=document.querySelector('.login');
const email=document.querySelector('.email');

const pas=document.querySelector('.pass');

login.addEventListener('click',()=>{
if(email.value !== "" && pas.value !== "" ){
      window.open('dashboard.html');
}else{
    alert("plz input your Filed")
}
})









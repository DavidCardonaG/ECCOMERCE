form.addEventListener('submit',function LocalStorage(){
           
    let user = document.querySelector('#user').value;
    let contraseña = document.querySelector('#pass').value;

    if(user=="" || contraseña==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(user)){
            localStorage.setItem("Usuario", user);
            localStorage.setItem("Contraseña", contraseña);
            getLocalStorage();
        }else{
             alert("INCORRECTO");
        }
        return false;
    }

    
})


function getLocalStorage(){
    let userSave = localStorage.getItem("Usuario");
    let contraSave = localStorage.getItem("Contraseña");
}


    function redireccionar(){
        if(userSave == "" || contraSave ==""){
       alert('ERROR')
      } else{
        window.location.href="index.html";
      }
    }
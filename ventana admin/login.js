const email = document.querySelector("#correo"),
    contraseña = document.querySelector("#clave"),
    btn = document.querySelector("#boton");

btn.addEventListener("click", ()=>{
    if(email.value === "correo@gmail.com" && contraseña.value === "123456"){
        window.location.href = "ventanaAdmin.html";
    }
    else{
        alert("este usuario no existe!");
    }
});

// Obtener los valores de los inputs
const email = document.querySelector("#idEmail");
const password = document.querySelector("#idPassword");
const boton = document.querySelector("#idBtn");
const botonModal = document.querySelector("#btnModal");
const modal = document.querySelector("#modalError");

boton.addEventListener("click", ()=>{
    
    if (email.value == "correo@ejemplo.com" && password.value == "123456") {
        
        window.location.href = "/ventanaAdmin.html";
        
    } else {
        document.getElementById("modalError").style.display = "block";
    }
});

botonModal.addEventListener("click", ()=>{
    modal.close();
})


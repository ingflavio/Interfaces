const handleClick = (event) => {
    event.preventDefault();
    
    const inputEmail = document.querySelector('#idEmail').value;
    const inputClave = document.querySelector('#idPassword').value;
    const modal = document.querySelector("#modalLogin");
    
    if(inputEmail == 'administrador@gmail.com' && inputClave == '123456'){
        window.location.replace('http://localhost:5173/admin')
    }
    else{
        if(inputEmail != "" && inputClave != ""){
            modal.showModal();
        }
    }
};

const botonModal = () => {
    const inputEmail = document.querySelector('#idEmail');
    const inputClave = document.querySelector('#idPassword');
    const botonModal = document.querySelector("#btnModal");
    const modal = document.querySelector("#modalLogin");

    botonModal.addEventListener("click", ()=>{
        inputEmail.value = "";
        inputClave.value = "";
        modal.close();
    })
}

export const Login = () => {

    return (
        <>
        <form className="container py-5" method="POST">
            <div className="row py-5">
                <div className="col-md-6 m-auto text-center"> 
                    <div className="p-4 border rounded">
                        <h2 className="mb-4">Sing In</h2>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control mt-1" id="idEmail" name="email" placeholder="Ingrese su correo" required/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control mt-1" id="idPassword" name="password" placeholder="Ingrese su contraseña" required/>
                        </div>
                        <button type="submit" className="btn btn-success btn-lg px-3" id="idBtn" onClick={handleClick}>Iniciar</button> 
                    </div>
                </div>
            </div>
        </form>

        <dialog  id="modalLogin">
            <h3 className="errorTituloModal">ERROR</h3>
            <p className="mensajeError">El usuario ingresado no existe, <span className="msjFocusModal">intentelo nuevamente!</span></p>
            <button id="btnModal" onClick={botonModal}>Cerrar</button>
        </dialog>
        </>
    )
}
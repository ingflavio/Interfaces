const handleClick = (event) => {
    event.preventDefault();
    
    const inputEmail = document.querySelector('#idEmail').value;
    const inputClave = document.querySelector('#idPassword').value;
    
    
    if(inputEmail == 'administrador@gmail.com' && inputClave == '123456'){
        window.location.replace('http://localhost:5173/admin')
    }
    else{
        alert('mi papa tenia un burro')
    }
  };

export const Login = () => {

  return (
    <>
    <form className="container py-5">
        <div className="row py-5">
            <div className="col-md-6 m-auto text-center"> 
                <div className="p-4 border rounded">
                    <h2 className="mb-4">Iniciar Sesión</h2>
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
    
    <div id="modalError" className="modal">
        <div className="modal-content p-4 border rounded">
            <h4 className="text-center mb-3">Error de inicio de sesión</h4>
            <p className="text-center">Usuario o contraseña incorrectos.</p>
            <div className="text-center">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="btnModal">Cerrar</button>
            </div>
        </div>
    </div>
    </>
  )
}
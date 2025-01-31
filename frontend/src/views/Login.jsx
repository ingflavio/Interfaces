export const Login = () => {
  return (
    <>
          <div className="modal fade bg-white" id="templatemo_search" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="w-100 pt-1 mb-5 text-right">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" method="get" className="modal-content modal-body border-0 p-0">
                <div className="input-group mb-2">
                    <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..."/>
                    <button type="submit" className="input-group-text bg-success text-light">
                        <i className="fa fa-fw fa-search text-white"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
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
                    <button type="submit" className="btn btn-success btn-lg px-3" id="idBtn">Iniciar</button>
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
import { useState } from "react";
import { URL } from "../API/URL";
import axios from "axios";

export const Register = () => {
  const [formBody, setFormBody] = useState({
    nombreDeUsuario: "stalin",
    gmail: "stalin@gmail.com",
    contrasena: "12345",
  });

  const requestLogin = async () => {
    try {
      const response = await axios.post(URL + "Login", formBody);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="container py-5" method="POST">
        <div className="row py-5">
          <div className="col-md-6 m-auto text-center">
            <div className="p-4 border rounded">
              <h2 className="mb-4">Sing Up</h2>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control mt-1"
                  id="idEmail"
                  name="email"
                  placeholder="Ingrese su correo"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control mt-1"
                  id="idPassword"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <button
                onClick={requestLogin}
                type="submit"
                className="btn btn-success btn-lg px-3"
                id="idBtn"
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </form>

      <dialog id="modalLogin">
        <h3 className="errorTituloModal">ERROR</h3>
        <p className="mensajeError">
          El usuario ingresado no existe,{" "}
          <span className="msjFocusModal">intentelo nuevamente!</span>
        </p>
        <button id="btnModal">Cerrar</button>
      </dialog>
    </>
  );
};

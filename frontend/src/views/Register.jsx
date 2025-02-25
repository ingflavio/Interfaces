import { useState } from "react";
import { URL } from "../API/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formBody, setFormBody] = useState({
    nombreDeUsuario: "",
    gmail: "",
    contrasena: "",
  });
  const [response, setResponse] = useState("");

  let navigate = useNavigate();

  const handleFormBody = (e) => {
    const { id, value } = e.target;
    setFormBody((prev) => ({ ...prev, [id]: value }));
  };

  const requestRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + "register", formBody);
      if (res.status === 200) {
        alert("Registro exitoso, iniciar sesión");
        navigate("/login");
      }
    } catch (error) {
      setResponse(error);
      if (response.status == 400) {
        alert(response.message);
      } else {
        alert(error);
      }
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
                  onChange={handleFormBody}
                  type="text"
                  className="form-control mt-1"
                  id="nombreDeUsuario"
                  name="username"
                  placeholder="Ingrese su nombre de usuario"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  onChange={handleFormBody}
                  type="email"
                  className="form-control mt-1"
                  id="gmail"
                  name="email"
                  placeholder="Ingrese su correo"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  onChange={handleFormBody}
                  type="current-password"
                  className="form-control mt-1"
                  id="contrasena"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <button
                onClick={requestRegister}
                type="submit"
                className="btn bgbuttonPalette btn-lg px-3"
                id="idBtn"
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

import { useState } from "react";
import { URL } from "../API/URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [formBody, setFormBody] = useState({
    nombreDeUsuario: "",
    contrasena: "",
  });

  let navigate = useNavigate();

  const [response, setResponse] = useState("");

  const handleFormBody = (e) => {
    const { id, value } = e.target;
    setFormBody((prev) => ({ ...prev, [id]: value }));
  };

  const requestLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/Api/login", formBody);
      if (res.status === 200) {
        login(res.data);
        navigate("/admin");
      } else {
        console.error("Error en la respuesta:", res);
        setResponse({ status: res.status, response: res.data });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setResponse({
        status: error.response?.status || 500,
        response: error.response?.data || "Error desconocido",
      });
    }
  };

  return (
    <>
      <form className="container py-5" method="POST">
        <div className="row py-5">
          <div className="col-md-6 m-auto text-center">
            <div className="p-4 border rounded">
              <h2 className="mb-4">Sing In</h2>
              <div className="form-group mb-3">
                <input
                  onChange={handleFormBody}
                  type="text"
                  className="form-control mt-1"
                  id="nombreDeUsuario"
                  name="nombreDeUsuario"
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
              <div className="form-group mb-3">
                {response.status === 400 ? (
                  <p className="text-danger">{response.response.data}</p>
                ) : (
                  ""
                )}
              </div>
              <button
                onClick={requestLogin}
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

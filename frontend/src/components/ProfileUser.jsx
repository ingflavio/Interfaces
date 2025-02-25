import { CgShapeCircle } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js"; // Importa la librería

export const ProfileUser = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Api/datos-extras",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
            responseType: "json",
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setUserError("Error al obtener los datos del usuario.");
      }
    };

    const obtenerFoto = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Api/datos-extras/foto",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            responseType: "blob",
          }
        );

        const imagenUrl = URL.createObjectURL(response.data);
        setImagen(imagenUrl);
      } catch (err) {
        setError("Error al obtener la foto.");
        console.error(err);
      }
    };

    fetchData();
    obtenerFoto();
  }, [user]);

  useEffect(() => {
    console.log("userData actualizado:", userData);
  }, [userData]);

  const descargarPDF = () => {
    // Guardar los estilos originales
    const originalOverflow =
      document.querySelector(".contentDashboard").style.overflow;

    // Eliminar overflow para poder capturar todo el contenido
    document.querySelector(".contentDashboard").style.overflow = "visible";

    const element = document.getElementById("profileContent");
    const opt = {
      margin: 10,
      filename: "perfil_usuario.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        format: "a3",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(element).save();

    document.querySelector(".contentDashboard").style.overflow =
      originalOverflow;
  };

  return (
    <div>
      <div
        id="profileContent"
        className="container-fluid bgdivSecondary contentDashboard"
      >
        <div className="row mb-3 p-5">
          <div className="col-12 col-md-4">
            {imagen ? (
              <img
                src={imagen}
                className="w-fluid imageCurriculum"
                alt="Foto del usuario"
              />
            ) : (
              <p>Cargando imagen...</p>
            )}
          </div>
          <div className="col-12 col-md-8 textoCurriculum px-4">
            <p className="text-white">{userData?.nombre ?? "No disponible"}</p>
            <h1 className="text-white">
              <b>{userData?.apellido ?? "No disponible"}</b>
            </h1>
            <span className="text-danger">
              {userData?.profesion ?? "No disponible"}
            </span>
          </div>
        </div>

        <div className="row p-5">
          <div className="col-12 col-md-8 text-white">
            <h1>Mi Perfil</h1>
            <p>{userData?.perfil ?? "No disponible"}</p>
          </div>
          <div className="col-12 col-md-4 text-white">
            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <IoMdMail className="text-white" />
              </div>
              <span>{userData?.gmail ?? "No disponible"}</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <TbWorld className="text-white" />
              </div>
              <span>www.google.com</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <FaPhoneAlt className="text-white" />
              </div>
              <span>{userData?.telefono ?? "No disponible"}</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <span>{userData?.direccion ?? "No disponible"}</span>
            </div>
          </div>
        </div>

        <div className="row bgdivPrimary px-5 py-2">
          <div className="col-12 col-md-8">
            <div className="bgdivSecondary text-white text-center">
              <p>Experiencia Laboral</p>
            </div>
            {userData
              ? userData.experenciasLaborales.map((item) => (
                  <div className="text-start" key={item.id}>
                    <div className="text1">
                      <CiCircleCheck /> <b>{item.empresa}</b>
                    </div>
                    <div className="text2 ps-5">
                      <p>{item.descripcion}</p>
                      <p>
                        <small>
                          Inicio: {new Date(item.fechaIni).toLocaleDateString()}
                        </small>
                      </p>
                      <p>
                        <small>
                          Fin: {new Date(item.fechaFin).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              : "No disponible"}
          </div>
          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-6 col-md-12">
                <div className="bgdivSecondary text-white text-center">
                  <p>Idiomas</p>
                </div>
                {userData
                  ? userData.idiomas.map((idioma, index) => (
                      <div
                        className="text-center d-flex justify-content-center align-items-center"
                        key={index}
                      >
                        <CiCircleCheck className="me-2 mb-3" />
                        <p>{idioma}</p>
                      </div>
                    ))
                  : "No disponible"}
              </div>
              <div className="col-6 col-md-12 mt-2">
                <div className="bgdivSecondary text-white text-center">
                  <p>Competencias</p>
                </div>
                {userData
                  ? userData.competencias.map((item) => (
                      <div className="text-center" key={item.id}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="me-3">{item.nombre}</span>
                          <div className="progress flex-grow-1">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${item.habilidad}%` }}
                              aria-valuenow={item.habilidad}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : "No disponible"}
              </div>
            </div>
          </div>
        </div>
        <div className="row bgdivPrimary px-5 py-2">
          <div className="col-12 col-md-8">
            <div className="bgdivSecondary text-white text-center">
              <p>Formacion Académica</p>
            </div>
            {userData
              ? userData.formacion.map((item) => (
                  <div className="text-start" key={item.id}>
                    <div className="text1">
                      <CiCircleCheck /> <b>{item.titulo}</b>
                    </div>
                    <div className="text2 ps-5">
                      <p>
                        <b>{item.instituto}</b>
                      </p>
                      <p>
                        <small>
                          Inicio: {new Date(item.fechaIni).toLocaleDateString()}
                        </small>
                      </p>
                      <p>
                        <small>
                          Fin: {new Date(item.fechaFin).toLocaleDateString()}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              : "No disponible"}
          </div>
          <div className="col-12 col-md-4">
            <div className="bgdivSecondary text-white text-center">
              <p>Habilidades</p>
            </div>
            {userData
              ? userData.habilidades.map((item) => (
                  <div className="d-flex align-items-center" key={item.id}>
                    <span className="me-3">{item.nombreHabilidad}</span>
                    {[...Array(item.habilidad)].map((_, index) => (
                      <CgShapeCircle key={index} />
                    ))}
                  </div>
                ))
              : "No disponible"}
          </div>
        </div>
      </div>
      <div className="bgdivSecondary p-3">
        <button onClick={descargarPDF} className="btn bgbuttonPalette mb-4">
          Descargar PDF
        </button>
      </div>
    </div>
  );
};

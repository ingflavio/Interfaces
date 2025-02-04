import { CgShapeCircle } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProfileUser = () => {
  const { user } = useAuthStore();
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerFoto = async () => {
      try {
        const token = user.token;
        const response = await axios.get(
          "http://localhost:8080/Api/datos-extras/foto",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const imagenUrl = URL.createObjectURL(response.data);
        setImagen(imagenUrl);
      } catch (err) {
        setError("Error al obtener la foto");
        console.error(err);
      }
    };

    obtenerFoto();
  }, []);

  return (
    <>
      <div className="container-fluid bg-black contentDashboard">
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
            <p className="text-white">Alejandro</p>
            <h1 className="text-white">
              <b>Torres</b>
            </h1>
            <span className="text-danger">Programador Web</span>
          </div>
        </div>

        <div className="row p-5">
          <div className="col-12 col-md-8 text-white">
            <h1>Mi Perfil</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="col-12 col-md-4 text-white">
            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <IoMdMail className="text-white" />
              </div>
              <span>hola@gmail.com</span>
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
              <span>+1 234 567 890</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="iconCv bg-danger rounded-circle d-flex align-items-center justify-content-center me-3">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <span>Calle Agata Av. Piar</span>
            </div>
          </div>
        </div>

        <div className="row bg-white px-5 py-2">
          <div className="col-12 col-md-8">
            <div className="bg-black text-white text-center">
              <p>Experiencia Laboral</p>
            </div>
            <div className="text-start">
              <div className="text1">
                <CiCircleCheck /> <b>Multinacional Gonzalez 2019-2023</b>
              </div>
              <div className="text2 ps-5">
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years.
              </div>
            </div>
            <div className="text-start">
              <div className="text1">
                <CiCircleCheck /> <b>Multinacional Gonzalez 2019-2023</b>
              </div>
              <div className="text2 ps-5">
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years.
              </div>
            </div>
            <div className="text-start">
              <div className="text1">
                <CiCircleCheck /> <b>Multinacional Gonzalez 2019-2023</b>
              </div>
              <div className="text2 ps-5">
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years.
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="row">
              <div className="col-6 col-md-12">
                <div className="bg-black text-white text-center">
                  <p>Idiomas</p>
                </div>
                <div className="text-center">
                  <CiCircleCheck /> <b>Español</b>
                </div>
                <div className="text-center">
                  <CiCircleCheck /> <b>Ingles</b>
                </div>
                <div className="text-center">
                  <CiCircleCheck /> <b>frances</b>
                </div>
              </div>
              <div className="col-6 col-md-12 mt-2">
                <div className="bg-black text-white text-center">
                  <p>Competencias</p>
                </div>
                <div className="text-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="me-3">Software 1</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="me-3">Software 2</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="me-3">Software 3</span>
                    <div className="progress flex-grow-1">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-white px-5 py-2">
          <div className="col-12 col-md-8">
            <div className="bg-black text-white text-center">
              <p>Formacion Académica</p>
            </div>
            <div className="text-start">
              <div className="text1">
                <CiCircleCheck /> <b>Universidad de Carabobo</b>
              </div>
              <div className="text2 ps-5">
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years.
              </div>
            </div>
            <div className="text-start">
              <div className="text1">
                <CiCircleCheck /> <b>Universidad UJAP</b>
              </div>
              <div className="text2 ps-5">
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years.
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-black text-white text-center">
              <p>Habilidades</p>
            </div>
            <div className="d-flex align-items-center">
              <span className="me-3">Liderazgo</span>
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
            </div>
            <div className="d-flex align-items-center">
              <span className="me-3">Bacaneria</span>
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
            </div>
            <div className="d-flex align-items-center">
              <span className="me-3">Palomo</span>
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
              <CgShapeCircle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

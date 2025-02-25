import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Modal from "./Modal";
import usePaletteStore from "../store/useColorsStore";

export const Colors = () => {
  const { user } = useAuthStore();
  const [paletaActiva, setPaletaActiva] = useState("");
  const [paletas, setPaletas] = useState([]);

  const {
    primary_color,
    secondary,
    accent,
    button,
    titleSize,
    subtitleSize,
    paragraphSize,
    activa,
    nombrePaleta,
    setPalette,
  } = usePaletteStore();

  const [formData, setFormData] = useState({
    primary_color,
    secondary,
    accent,
    button,
    titleSize,
    subtitleSize,
    paragraphSize,
    activa,
    nombrePaleta,
  });

  const [messageModal, setMessageModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      ...formData,
      activa: false,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/Api/Colores/Crear",
        newFormData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessageModal("Configuración guardada con éxito.");
        getPaletas();
      } else {
        setMessageModal("Hubo un error al guardar la configuración.");
      }
      openModal();
    } catch (error) {
      setMessageModal("Hubo un error al enviar la solicitud.");
      openModal();
    }

    setPalette(formData);
  };

  const handleActivarPaleta = async (paleta) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/Api/Colores/Activar?Nombrepaleta=${paleta}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessageModal(response.data);
      await getPaletaActiva();
    } catch (error) {
      alert(
        error.response
          ? `Error del servidor: ${JSON.stringify(error.response.data)}`
          : "Error al conectar con el servidor"
      );
    }
    openModal();
  };

  const handleBorrar = async (paleta) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/Api/Colores/Eliminar?Nombrepaleta=${paleta}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessageModal(response.data);
      getPaletas();
      getPaletaActiva();
    } catch (error) {
      error.response
        ? setMessageModal(
            `Error del servidor: ${JSON.stringify(error.response.data)}`
          )
        : setMessageModal("Error al conectar con el servidor");
    }
    openModal();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getPaletas = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Api/Colores/Nombres`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPaletas(response.data);
    } catch (error) {
      alert(
        error.response
          ? `Error del servidor: ${JSON.stringify(error.response.data)}`
          : "Error al conectar con el servidor"
      );
    }
  };

  const getPaletaActiva = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Api/Colores/ObtenerActiva`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        primary_color: response.data.primary_color,
        secondary: response.data.secondary,
        accent: response.data.accent,
        button: response.data.button,
        titleSize: response.data.titleSize,
        subtitleSize: response.data.subtitleSize,
        paragraphSize: response.data.paragraphSize,
        activa: response.data.activa,
        nombrePaleta: response.data.nombrePaleta,
      });

      setPaletaActiva(response.data.nombrePaleta);
      const paletaActiva = response.data;
      usePaletteStore.getState().setPalette(paletaActiva);
    } catch (error) {
      alert(
        error.response
          ? `Error del servidor: ${JSON.stringify(error.response.data)}`
          : "Error al conectar con el servidor"
      );
    }
  };

  useEffect(() => {
    getPaletas();
    getPaletaActiva();
  }, []);

  return (
    <div className="container-fluid h-100 w-100 bgdivSecondary contentDashboard">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="container form-group bgdivPrimary mt-3 p-3 rounded-3 p-0">
            <h2 className="text-center">Colores</h2>

            <div className="flex text-center mt-3 mb-3">
              <h3 className="text-center mb-3">
                Paleta Activa: {paletaActiva}
              </h3>

              <h4 className="text-center">Paletas Disponibles</h4>
              {paletas.map((name, index) => (
                <button
                  onClick={() => handleActivarPaleta(name)} // Pasa una función, no el resultado
                  className="btn mx-1 bgbutton"
                  key={index}
                >
                  {name}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Input para el color primario */}
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="primary_color" className="form-label">
                      Color Primario
                    </label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="primary_color"
                      value={formData.primary_color}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-3">
                  {/* Input para el color secundario */}
                  <div className="mb-3">
                    <label htmlFor="secondary" className="form-label">
                      Color Secundario
                    </label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="secondary"
                      value={formData.secondary}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Input para el color de acento */}
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="accent" className="form-label">
                      Color de Acento
                    </label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="accent"
                      value={formData.accent}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Input para el color del botón */}
                <div className="col-3">
                  <div className="mb-3">
                    <label htmlFor="button" className="form-label">
                      Color del Botón
                    </label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="button"
                      value={formData.button}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Input para el tamaño del título */}
              <div className="mb-3">
                <label htmlFor="titleSize" className="form-label">
                  Tamaño del Título
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="titleSize"
                  value={formData.titleSize}
                  onChange={handleChange}
                />
              </div>

              {/* Input para el tamaño del subtítulo */}
              <div className="mb-3">
                <label htmlFor="subtitleSize" className="form-label">
                  Tamaño del Subtítulo
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="subtitleSize"
                  value={formData.subtitleSize}
                  onChange={handleChange}
                />
              </div>

              {/* Input para el tamaño del párrafo */}
              <div className="mb-3">
                <label htmlFor="paragraphSize" className="form-label">
                  Tamaño del Párrafo
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="paragraphSize"
                  value={formData.paragraphSize}
                  onChange={handleChange}
                />
              </div>

              {/* Input para tipografia */}
              <div className="mb-3">
                <label htmlFor="nombrePaleta" className="form-label">
                  Nombre de la Paleta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombrePaleta"
                  value={formData.nombrePaleta}
                  onChange={handleChange}
                />
              </div>

              {/* Input para el nombre de la paleta */}
              <div className="mb-3">
                <label htmlFor="nombrePaleta" className="form-label">
                  Nombre de la Paleta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombrePaleta"
                  value={formData.nombrePaleta}
                  onChange={handleChange}
                />
              </div>

              {/* Botón de Guardar */}
              <div className="d-grid">
                <button type="submit" className="btn bgbuttonPalette">
                  Guardar Paleta
                </button>

                <button
                  type="button"
                  className="btn bgbuttonPalette mt-2"
                  onClick={() => handleBorrar(paletaActiva)}
                >
                  Borrar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 form-group bgdivPrimary mt-3 p-3 rounded-3">
          <h4 className="text-center mt-2">Vista Previa</h4>
          <div
            className="preview-container p-3"
            style={{
              backgroundColor: formData.primary_color,
              color: formData.secondary,
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2
              style={{
                color: formData.accent,
                fontSize: `${formData.titleSize}px`,
              }}
            >
              Título de ejemplo
            </h2>
            <h3
              style={{
                color: formData.accent,
                fontSize: `${formData.subtitleSize}px`,
              }}
            >
              Subtítulo
            </h3>
            <p style={{ fontSize: `${formData.paragraphSize}px` }}>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500, cuando un impresor
              (N. del T. persona que se dedica a la imprenta) desconocido usó
              una galería de textos y los mezcló de tal manera que logró hacer
              un libro de textos especimen. No sólo sobrevivió 500 años, sino
              que tambien ingresó como texto de relleno en documentos
              electrónicos, quedando esencialmente igual al original. Fue
              popularizado en los 60s con la creación de las hojas "Letraset",
              las cuales contenian pasajes de Lorem Ipsum, y más recientemente
              con software de autoedición, como por ejemplo Aldus PageMaker, el
              cual incluye versiones de Lorem Ipsum.
            </p>
            <button
              style={{
                backgroundColor: formData.button,
                color: formData.secondary,
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Botón de Prueba
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {messageModal}
      </Modal>
    </div>
  );
};

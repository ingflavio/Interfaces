import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

export const Colors = () => {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    primary_color: "#0000ff",
    secondary: "#ff0000",
    accent: "#0000ff",
    button: "#0000ff",
    titleSize: 14,
    subtitleSize: 12,
    paragraphSize: 12,
    nombrePaleta: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/Api/Colores/Crear",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Configuración guardada con éxito.");
      } else {
        alert("Hubo un error al guardar la configuración.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al enviar la solicitud.");
    }
  };

  return (
    <div className="container-fluid h-100 w-100 bg-black contentDashboard">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="container form-group bg-white mt-3 p-3 rounded-3 p-0">
            <h2 className="text-center">Colores</h2>
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
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 form-group bg-white mt-3 p-3 rounded-3">
          <h4 className="text-center mt-2">Vista Previa</h4>
        </div>
      </div>
    </div>
  );
};

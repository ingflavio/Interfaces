import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../API/URL";
import useAuthStore from "../store/useAuthStore";
import Modal from "../components/Modal";
import "swiper/css";
import "swiper/css/navigation";

export const AddImagen = () => {
  const { user } = useAuthStore();
  const [form, setForm] = useState({
    imagen: null,
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { id, files } = e.target;

    if (e.target.type === "file") {
      setForm((prev) => ({
        ...prev,
        [id]: files[0], // Asegúrate de que el ID coincida con "imagen"
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.imagen) {
      console.log("Estado del formulario:", form); // Depuración
      setResponseMsg("Por favor, selecciona un archivo.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("foto", form.imagen);

    try {
      const response = await axios.post(
        "http://localhost:8080/Api/Fotos/Subir",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setResponseMsg("Archivo subido exitosamente.");
      setMessageModal("Archivo subido exitosamente.");
      openModal();
    } catch (error) {
      console.error(
        "Error al subir el archivo:",
        error.response?.data || error.message
      );
      setResponseMsg("Error al subir el archivo.");
      setMessageModal("Error al subir el archivo.");
      openModal();
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container-fluid h-100 w-100 bgdivSecondary contentDashboard">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {messageModal}
      </Modal>
      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-white">
            Selecciona una foto
          </label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Subiendo..." : "Subir Foto"}
        </button>
        {responseMsg && (
          <div className="mt-3 alert alert-info">{responseMsg}</div>
        )}
      </form>
    </div>
  );
};

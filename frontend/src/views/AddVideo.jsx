import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../API/URL";
import useAuthStore from "../store/useAuthStore";
import Modal from "../components/Modal";
import "swiper/css";
import "swiper/css/navigation";

export const AddVideo = () => {
  const { user } = useAuthStore();
  const [dataVideo, setDataVideo] = useState([]);
  const [form, setForm] = useState({
    titulo: null,
    descripcion: null,
    video: null,
    subtitulosEs: null,
    subtitulosEn: null,
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { id, files, value } = e.target;

    if (e.target.type === "file") {
      setForm((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { titulo, descripcion, video, subtitulosEs, subtitulosEn } = form;
    if (!titulo || !descripcion || !video || !subtitulosEs || !subtitulosEn) {
      setResponseMsg("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo); // Añade el título
    formData.append("descripcion", descripcion); // Añade la descripción
    formData.append("video", video);
    formData.append("subtitulosEs", subtitulosEs);
    formData.append("subtitulosEn", subtitulosEn);

    try {
      setLoading(true);
      const res = await axios.post(URL + "Videos/Subir", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setResponseMsg("Video subido correctamente.");

      formRef.current.reset();

      setForm({
        titulo: null,
        descripcion: null,
        video: null,
        subtitulosEs: null,
        subtitulosEn: null,
      });
    } catch (err) {
      console.error(err);
      setResponseMsg("Error al subir el video.");
    } finally {
      setLoading(false);
    }
    setMessageModal("Video subido correctamente");
    openModal();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // Evitar SSR

    const fetchAndTransformVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Api/Videos/ObtenerTodos",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const videos = response.data;

        const updatedVideos = await Promise.all(
          videos.map(async (video) => {
            const [videoRes, esRes, enRes] = await Promise.all([
              axios.get(`http://localhost:8080${video.videoUrl}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
                responseType: "blob",
              }),
              axios.get(`http://localhost:8080${video.subtituloEspanolUrl}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
                responseType: "blob",
              }),
              axios.get(`http://localhost:8080${video.subtituloInglesUrl}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
                responseType: "blob",
              }),
            ]);

            return {
              ...video,
              videoUrl: window.URL.createObjectURL(videoRes.data),
              subtituloEspanolUrl: window.URL.createObjectURL(esRes.data),
              subtituloInglesUrl: window.URL.createObjectURL(enRes.data),
            };
          })
        );

        setDataVideo(updatedVideos);
      } catch (err) {
        console.error("Error al obtener o procesar los videos:", err);
      }
    };

    fetchAndTransformVideos();
  }, [isModalOpen]);

  return (
    <div className="container-fluid h-100 w-100 bgdivSecondary contentDashboard">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {messageModal}
      </Modal>
      <div className="form">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label text-white">
              Titulo
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label text-white">
              Descripcion
            </label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="video" className="form-label text-white">
              Video
            </label>
            <input
              type="file"
              className="form-control"
              id="video"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subtitulosEs" className="form-label text-white">
              Subtítulos en Español
            </label>
            <input
              type="file"
              className="form-control"
              id="subtitulosEs"
              accept=".vtt"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subtitulosEn" className="form-label text-white">
              Subtítulos en Inglés
            </label>
            <input
              type="file"
              className="form-control"
              id="subtitulosEn"
              accept=".vtt"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Subiendo..." : "Subir Video"}
          </button>
          {responseMsg && (
            <div className="mt-3 alert alert-info">{responseMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

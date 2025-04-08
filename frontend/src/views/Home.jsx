import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import { Video } from "../components/video";
import { Navigation } from "swiper/modules";
import Modal from "../components/Modal";
import "swiper/css";
import "swiper/css/navigation";

export const Home = () => {
  const { user } = useAuthStore();
  const [dataVideo, setDataVideo] = useState([]);
  const [messageModal, setMessageModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const eliminarVideo = async (idVideo) => {
    setMessageModal("Video eliminado correctamente");
    openModal();
    try {
      const response = await axios.delete(
        "http://localhost:8080/Api/Videos/Eliminar",
        {
          params: { idVideo: idVideo },
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error al eliminar el video:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

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

  console.log("91", dataVideo);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {messageModal}
      </Modal>
      <div
        className="modal fade bgdivPrimary"
        id="templatemo_search"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="w-100 pt-1 mb-5 text-right">
            <button
              type="button"
              className="btn-close bgbuttonPalette"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form
            action=""
            method="get"
            className="modal-content modal-body border-0 p-0"
          >
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                id="inputModalSearch"
                name="q"
                placeholder="Search ..."
              />
              <button
                type="submit"
                className="input-group-text bg-success text-white"
              >
                <i className="fa fa-fw fa-search text-white"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#template-mo-zay-hero-carousel"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="../../public/banner_img_01.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 text-success">
                      <b>Zay</b> eCommerce
                    </h1>
                    <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                    <p>
                      Zay Shop is an eCommerce HTML5 CSS template with latest
                      version of Bootstrap 5 (beta 1). This template is 100%
                      free provided by{" "}
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://templatemo.com"
                        target="_blank"
                      >
                        TemplateMo
                      </a>{" "}
                      website. Image credits go to{" "}
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://stories.freepik.com/"
                        target="_blank"
                      >
                        Freepik Stories
                      </a>
                      ,
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://unsplash.com/"
                        target="_blank"
                      >
                        Unsplash
                      </a>{" "}
                      and
                      <a
                        rel="sponsored"
                        className="text-success"
                        href="https://icons8.com/"
                        target="_blank"
                      >
                        Icons 8
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="../../public/banner_img_02.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Proident occaecat</h1>
                    <h3 className="h2">Aliquip ex ea commodo consequat</h3>
                    <p>
                      You are permitted to use this Zay CSS template for your
                      commercial websites. You are{" "}
                      <strong>not permitted</strong> to re-distribute the
                      template ZIP file in any kind of template collection
                      websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img
                    className="img-fluid"
                    src="../../public/banner_img_03.jpg"
                    alt=""
                  />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Repr in voluptate</h1>
                    <h3 className="h2">Ullamco laboris nisi ut </h3>
                    <p>
                      We bring you 100% free CSS templates for your websites. If
                      you wish to support TemplateMo, please make a small
                      contribution via PayPal or tell your friends about our
                      website. Thank you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <i className="fas fa-chevron-left"></i>
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>

      <section className="container py-5 bgdivPrimary">
        <div className="reproductor mt-4">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {dataVideo && dataVideo.length > 0 ? (
              dataVideo.map((video, index) => (
                <SwiperSlide key={index}>
                  <Video
                    titulo={video.titulo}
                    descripcion={video.descripcion}
                    videoUrl={video.videoUrl}
                    subsEsp={video.subtituloEspanolUrl}
                    subsEng={video.subtituloInglesUrl}
                  />
                  <button
                    className="btn bg-danger"
                    onClick={() => eliminarVideo(video.id)}
                  >
                    Eliminar Video
                  </button>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p className="text-center text-black">Sin Videos</p>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="../../public/category_img_01.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h5 className="text-center mt-3 mb-3">Watches</h5>
            <p className="text-center">
              <a className="btn bgbuttonPalette">Go Shop</a>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="../../public/category_img_02.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h2 className="h5 text-center mt-3 mb-3">Shoes</h2>
            <p className="text-center">
              <a className="btn bgbuttonPalette">Go Shop</a>
            </p>
          </div>
          <div className="col-12 col-md-4 p-5 mt-3">
            <a href="#">
              <img
                src="../../public/category_img_03.jpg"
                className="rounded-circle img-fluid border"
              />
            </a>
            <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
            <p className="text-center">
              <a className="btn bgbuttonPalette">Go Shop</a>
            </p>
          </div>
        </div>
      </section>

      <section className="bgdivPrimary">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Featured Product</h1>
              <p>
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="shop-single.html">
                  <img
                    src="../../public/feature_prod_01.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$240.00</li>
                  </ul>
                  <a
                    href="shop-single.html"
                    className="h2 text-decoration-none text-dark"
                  >
                    Gym Weight
                  </a>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sunt in culpa qui officia deserunt.
                  </p>
                  <p className="text-muted">Reviews (24)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="shop-single.html">
                  <img
                    src="../../public/feature_prod_02.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                      <i className="text-muted fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$480.00</li>
                  </ul>
                  <a
                    href="shop-single.html"
                    className="h2 text-decoration-none text-dark"
                  >
                    Cloud Nike Shoes
                  </a>
                  <p className="card-text">
                    Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                    vitae pharetra sed, commodo ullamcorper.
                  </p>
                  <p className="text-muted">Reviews (48)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="shop-single.html">
                  <img
                    src="../../public/feature_prod_03.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                      <i className="text-warning fa fa-star"></i>
                    </li>
                    <li className="text-muted text-right">$360.00</li>
                  </ul>
                  <a
                    href="shop-single.html"
                    className="h2 text-decoration-none text-dark"
                  >
                    Summer Addides Shoes
                  </a>
                  <p className="card-text">
                    Curabitur ac mi sit amet diam luctus porta. Phasellus
                    pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                  </p>
                  <p className="text-muted">Reviews (74)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

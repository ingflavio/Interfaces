import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";
import "./assets/css/fontawesome.css";
import "./assets/css/fontawesome.min.css";
import "./assets/css/slick.min.css";
import "./assets/css/slick-theme.css";
import "./assets/css/slick-theme.min.css";
import "./assets/css/templatemo.css";
import "./assets/css/templatemo.min.css";
import './assets/css/ventanaAdm.css';
import "./assets/css/modal-style.css";
import "./assets/js/custom.js"
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/custom.js";
import "./assets/js/jquery-1.11.0.min.js";
import "./assets/js/jquery-migrate-1.2.1.min.js";
import "./assets/js/slick.min.js";
import "./assets/js/templatemo.js";
import "./assets/js/templatemo.min.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

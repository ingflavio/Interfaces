import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Index } from "./views/Index.jsx";
import { Shop } from "./views/Shop.jsx";
import { Login } from "./views/Login.jsx";
import { Register } from "./views/Register.jsx";
import { Contact } from "./views/Contact.jsx";
import { About } from "./views/About.jsx";
import { Admin } from "./views/Admin.jsx";
import { ProtectRoutes } from "./Routes/ProtectRoutes.jsx";
import { NoProtectRoutes } from "./Routes/NoProtectRoutes.jsx";
import usePaletteStore from "./store/useColorsStore.jsx";

export const App = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);

  const {
    primary_color,
    secondary,
    accent,
    button,
    titleSize,
    subtitleSize,
    paragraphSize,
  } = usePaletteStore();

  useEffect(() => {
    // Actualizar las variables CSS globales
    document.documentElement.style.setProperty(
      "--primary-color",
      primary_color
    );
    document.documentElement.style.setProperty("--secondary-color", secondary);
    document.documentElement.style.setProperty("--accent-color", accent);
    document.documentElement.style.setProperty("--button-color", button);
    document.documentElement.style.setProperty(
      "--title-size",
      `${titleSize}px`
    );
    document.documentElement.style.setProperty(
      "--subtitle-size",
      `${subtitleSize}px`
    );
    document.documentElement.style.setProperty(
      "--paragraph-size",
      `${paragraphSize}px`
    );
  }, [
    primary_color,
    secondary,
    accent,
    button,
    titleSize,
    subtitleSize,
    paragraphSize,
  ]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />

        <Route element={<NoProtectRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<ProtectRoutes />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
};

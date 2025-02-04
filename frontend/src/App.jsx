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

export const App = () => {
  const location = useLocation();

  useEffect(() => {}, [location]);

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

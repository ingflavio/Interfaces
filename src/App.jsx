import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Index } from "./views/Index.jsx";
import { Shop } from "./views/Shop.jsx";
import { Login } from "./views/Login.jsx";
import { Contact } from "./views/Contact.jsx";
import { About } from './views/About.jsx';
import { Admin } from './views/Admin.jsx';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
  }, [location]);

  return (
    <>
      {!location.pathname.includes('admin') && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
      {!location.pathname.includes('admin') && <Footer />}
    </>
  );
};

import { Route, Routes } from "react-router-dom";
import { Index } from "./views/Index.jsx";
import { Shop } from "./views/Shop.jsx";
import { Login } from "./views/Login.jsx";
import { Contact } from "./views/Contact.jsx";
import { About } from './views/About.jsx';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="shop" element={<Shop />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  );
};

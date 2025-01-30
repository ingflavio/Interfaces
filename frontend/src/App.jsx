import { Route, Routes } from "react-router-dom";
import { Index } from "./views/Index.jsx";
import { Shop } from "./views/Shop.jsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="shop" element={<Shop />} />
    </Routes>
  );
};

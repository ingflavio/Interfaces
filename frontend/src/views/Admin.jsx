import { SideBar } from "../components/SideBar.jsx";
import { ProfileUser } from "../components/ProfileUser.jsx";
import { FormTable } from "../components/FormTable.jsx";
import "./styles/Dashboard.css";
import { useEffect, useState } from "react";
import { Colors } from "../components/Colors.jsx";
import { Tangram } from "../views/Tangram.jsx";
import { AddVideo } from "../views/AddVideo.jsx";
import { AddImagen } from "./AddImagen.jsx";

export const Admin = () => {
  const [menuOption, setMenuOption] = useState("Home");

  useEffect(() => {
    document.body.classList.add("admin-view");
    return () => {
      document.body.classList.remove("admin-view");
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0 bgdivSecondary">
            <SideBar setMenuOption={setMenuOption} />
          </div>
          <div className="col-10 p-0 bgdivTangram">
            {menuOption === "Home" ? (
              <FormTable />
            ) : menuOption === "Colors" ? (
              <Colors />
            ) : menuOption === "Tangram" ? (
              <Tangram />
            ) : menuOption === "Video" ? (
              <AddVideo />
            ) : menuOption === "Imagen" ? (
              <AddImagen />
            ) : (
              <ProfileUser />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

import { SideBar } from "../components/SideBar.jsx";
import { ProfileUser } from "../components/ProfileUser.jsx";
import { FormTable } from "../components/FormTable.jsx";
import "./styles/Dashboard.css";
import { useEffect, useState } from "react";

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
          <div className="col-2 p-0 bg-black">
            <SideBar setMenuOption={setMenuOption} />
          </div>
          <div className="col-10 p-0">
            {menuOption == "Home" ? <FormTable /> : <ProfileUser />}
          </div>
        </div>
      </div>
    </>
  );
};

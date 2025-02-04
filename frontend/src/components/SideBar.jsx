import { FaHome, FaUser } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { IoIosLogOut } from "react-icons/io";

export const SideBar = ({ setMenuOption }) => {
  const { logout } = useAuthStore();

  const handleMenuChange = (option) => {
    setMenuOption(option);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white p-3 sidebarDashboard">
      <h2 className="text-center">Menu</h2>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => handleMenuChange("Home")}
            className="nav-link text-white"
          >
            <FaHome className="me-2" />
            Home
          </a>
        </li>
        <li className="nav-item mb-2">
          <a
            href="#"
            onClick={() => handleMenuChange("Perfil")}
            className="nav-link text-white"
          >
            <FaUser className="me-2" />
            Perfil
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" onClick={() => logout()} className="nav-link text-white">
            <IoIosLogOut className="me-2" />
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
};

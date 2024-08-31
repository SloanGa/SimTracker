import { faGear, faXmark, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "./Button/ButtonIcon";
import { useLocation } from "react-router-dom";
import { BurgerProps } from "../interfaces/BurgerProps.interface";

const BurgerMenu: React.FC<BurgerProps> = ({ onClose, onLogOut, onNavigate }) => {
  const location = useLocation();
  const icon = location.pathname === "/" ? faGear : faHome;

  return (
    <div className="flex flex-col items-center bg-primary w-1/4 h-1/3 fixed top-0 right-0 z-50 lg:hidden">
      <li className="mt-10">
        <ButtonIcon fontSize="fa-2xl" onClick={onNavigate} icon={icon} label="" />
      </li>

      <li className="mt-10">
        <ButtonIcon fontSize="fa-2xl" onClick={onLogOut} icon={faSignOutAlt} label="" />
      </li>
      <li className="mt-10">
        <ButtonIcon fontSize="fa-2xl" onClick={onClose} icon={faXmark} label="" />
      </li>
    </div>
  );
};

export default BurgerMenu;

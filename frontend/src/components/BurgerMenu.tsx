import { faGear, faXmark, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ButtonIcon from "./Button/ButtonIcon";

interface BurgerProps {
  onClose: () => void;
  onLogOut: () => void;
  onNavigate: () => void;
}

const BurgerMenu: React.FC<BurgerProps> = ({ onClose, onLogOut, onNavigate }) => {
  return (
    <div className="flex flex-col items-center bg-primary w-1/4 h-1/3 fixed top-0 right-0 z-50 lg:hidden">
      <li className="mt-10">
        <ButtonIcon fontSize="fa-2xl" onClick={onNavigate} icon={faGear} label="" />
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

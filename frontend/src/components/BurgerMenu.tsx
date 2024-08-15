import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import LogOut from "./Logout";

interface BurgerProps {
  onClose?: () => void; // onClick est optionnel
  onLogOut: () => void;
}

const BurgerMenu: React.FC<BurgerProps> = ({ onClose, onLogOut }) => {
  return (
    <div className="flex flex-col items-center bg-primary w-1/4 h-1/3 fixed top-0 right-0 z-50 lg:hidden">
      <a href="settings" className="text-white text-3xl mt-10">
        <FontAwesomeIcon icon={faGear} size="lg" />
      </a>

      <li className="mt-10">
        <LogOut onClick={onLogOut} />
      </li>
      <button className="text-white text-3xl mt-10">
        <FontAwesomeIcon icon={faXmark} size="lg" onClick={onClose} />
      </button>
    </div>
  );
};

export default BurgerMenu;

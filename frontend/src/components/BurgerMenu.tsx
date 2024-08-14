import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faXmark, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface BurgerProps {
  onClose?: () => void; // onClick est optionnel
}

const BurgerMenu: React.FC<BurgerProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center bg-primary w-1/4 h-1/3 fixed top-0 right-0 z-50 lg:hidden">
      <a href="settings" className="text-white text-3xl mt-10">
        <FontAwesomeIcon icon={faGear} size="lg" />
      </a>

      <button className="text-white text-3xl mt-10">
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
      </button>
      <button className="text-white text-3xl mt-10">
        <FontAwesomeIcon icon={faXmark} size="lg" onClick={onClose} />
      </button>
    </div>
  );
};

export default BurgerMenu;

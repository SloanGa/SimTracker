import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  onClick?: () => void; // onClick est optionnel
  props?: React.ReactNode; // Type pour props
}

const LogOut: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="text-3xl hover:text-btn ease-out duration-300" onClick={onClick}>
      <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
    </button>
  );
};

export default LogOut;

// definir les boutons de la nav en 1 seul bouton avec onclick, children (fontawesome)

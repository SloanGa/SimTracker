import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface ButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const ButtonIcon: React.FC<ButtonProps> = ({ onClick, icon, label, type }) => {
  return (
    <button
      className="text-3xl hover:text-btn ease-out duration-300"
      onClick={onClick}
      aria-label={label}
      type={type}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </button>
  );
};

export default ButtonIcon;

// definir les boutons de la nav en 1 seul bouton avec onclick, children (fontawesome)

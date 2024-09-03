import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface ButtonProps {
  onClick: () => void;
  icon: IconDefinition;
  label: string;
  fontSize: string;
}

const ButtonIcon: React.FC<ButtonProps> = ({ onClick, icon, label, fontSize }) => {
  return (
    <button
      className={`hover:text-btn ease-out duration-300 ${fontSize}`}
      onClick={onClick}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} size="lg" />
    </button>
  );
};

export default ButtonIcon;

import React from "react";

interface ButtonProps {
  onClick?: () => void; // onClick est optionnel
  props: React.ReactNode; // Type pour props
}

const ButtonToggle: React.FC<ButtonProps> = ({ props, onClick }) => (
  <button
    type="button"
    className="bg-primary text-white py-2 px-4 w-max mx-auto rounded-lg font-medium"
    onClick={onClick}
  >
    {props}
  </button>
);

export default ButtonToggle;

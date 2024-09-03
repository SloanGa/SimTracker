import React from "react";

interface ButtonProps {
  onClick?: () => void;
  props: React.ReactNode;
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

import React from "react";

interface ButtonProps {
  onClick?: () => void; // onClick est optionnel
  props: React.ReactNode; // Type pour props
}

const Button: React.FC<ButtonProps> = ({ props, onClick }) => (
  <button
    className="bg-otherbtn py-2 px-4 w-max mx-auto rounded-lg font-medium text-textBtn"
    onClick={onClick}
  >
    {props}
  </button>
);

export default Button;

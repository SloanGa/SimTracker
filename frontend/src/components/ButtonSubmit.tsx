import React from "react";

interface ButtonProps {
  onClick?: () => void;
  props: React.ReactNode;
}

const ButtonSubmit: React.FC<ButtonProps> = ({ props, onClick }) => (
  <button
    className="bg-btn py-2 px-4 w-max mx-auto my-2 rounded-lg font-medium text-textBtn"
    onClick={onClick}
  >
    {props}
  </button>
);

export default ButtonSubmit;

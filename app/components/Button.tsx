import React from "react";

interface ButtonProps {
  title: string;
  secondary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, secondary }) => {
  return (
    <button
      className={`w-full bg-[#6b89fd] text-white text-[13px] rounded hover:opacity-50 p-2 ${
        secondary && "bg-transparent border border-[#6b89fd]"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;

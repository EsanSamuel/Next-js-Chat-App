import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type: string;
  id: string;
  label: string;
  isGroup?: boolean;
  value?: string | any;
}

const Input: React.FC<InputProps> = ({
  register,
  required,
  type,
  label,
  id,
  isGroup,
  value,
}) => {
  return (
    <div className="flex flex-col gap-2 text-start">
      <label className="text-start text-[13px]">{label}</label>
      <input
        className={`
          form-input
          w-full 
          border
          focus:bg-[#6b89fd] 
          p-2 
          rounded
          shadow-sm
          ring-1
          ring-inset
        ring-gray-300
          focus:ring-2
          focus:ring-inset 
          text-black
          text-[10px]
          ${isGroup && "bg-[#2e333d] border-gray-400 border-[1px] text-white"}
       `}
        id={id}
        type={type}
        {...register(id, { required })}
        autoComplete={id}
        value={value}
      />
    </div>
  );
};

export default Input;

import { error } from "console";
import React from "react";

interface InputComponentProps {
  label: string;
  name: string;
  placeHolder?: string;
  type: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  value?: string | number;
  error?: string;
}

const InputComponent = ({
  label,
  name,
  placeHolder,
  type,
  onChange,
  required,
  value,
  error,
}: InputComponentProps) => {
  return (
    <div className="">
      <label
        htmlFor="name"
        className="block mb-[0.5rem] text-sm font-medium text-gray-600 "
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="bg-gray-50  text-gray-900 text-sm  p-2.5 outline-none  w-full block border border-gray-900  px-3 py-1.5 rounded-md focus:ring-primary-500 ring-primary-500"
        placeholder={placeHolder}
        onChange={onChange}
        required={required}
        value={value}
      />
      <div className="h-4">
        {error && (
          <p className="text-red-600 font-light text-[13px] h-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default InputComponent;

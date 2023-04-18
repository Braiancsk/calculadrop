import React from "react";
import { InputProps } from "./InputProps.types";

export const Input = ({label,name,id,defaultValue,value,onChange,type,placeholder,adornment}:InputProps) => {
  return (
    <div className='flex flex-col gap-1 text-white'>
    <label htmlFor={id} className="text-lg">{label}</label>

    <div className="relative w-full">
    <input
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
      name={name}
      value={value}
      id={id}
      className="text-dark border w-full border-white rounded-md p-2.5 bg-white focus:outline-0 focus:ring focus:ring-primary"
    />

    {adornment}
    
    </div>

   

  </div>
  
  );
};

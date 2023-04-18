import React from "react";
import CurrencyInputField from "react-currency-input-field";
import { CurrencyInputProps } from "./CurrencyInputProps.types";

export const CurrencyInput = ({label,name,id,defaultValue,value,onChange}:CurrencyInputProps) => {
  return (
    <div className='flex flex-col gap-1 text-white text-lg'>
    <label htmlFor={id}>{label}</label>
    <CurrencyInputField
      placeholder="R$ 0,00"
      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
      onValueChange={onChange}
      defaultValue={defaultValue}
      name={name}
      value={value}
      id={id}
      className="text-dark border border-white rounded-md p-2 bg-white focus:outline-0 focus:ring focus:ring-primary"
    />

   

  </div>
  
  );
};

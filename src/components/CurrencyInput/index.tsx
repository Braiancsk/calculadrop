import React from "react";
import CurrencyInputField from "react-currency-input-field";
import { CurrencyInputProps } from "./CurrencyInputProps.types";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BsInfoCircle } from "react-icons/bs";

export const CurrencyInput = ({
  label,
  name,
  id,
  defaultValue,
  value,
  onChange,
  tooltipId,
  tooltipMessage,
}: CurrencyInputProps) => {
  return (
    <div className="flex flex-col gap-1 text-white text-lg relative">
      <div className="relative w-max">
      <label htmlFor={id} className="w-max">{label}</label>
      <BsInfoCircle
        className="absolute top-1 right-[-40px]"
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipMessage}
      />
      <Tooltip id={tooltipId} className="max-w-[300px]" />
      </div>
 
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

import React from "react";
import CurrencyInputField from "react-currency-input-field";

export const CurrencyInput = (props:any) => {
  return (
    <CurrencyInputField
      {...props}
      placeholder="R$ 0,00"
      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
      onValueChange={props.onChange}
      id={props.id}
      className="text-dark border border-white rounded-md p-2 bg-white focus:outline-0 focus:ring focus:ring-primary"
    />
  );
};

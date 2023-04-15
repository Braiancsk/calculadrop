import React from 'react'
import CurrencyInputField from 'react-currency-input-field';

export const CurrencyInput = () => {
  return (
    <div className='flex flex-col gap-1 text-white'>
    <label htmlFor='product-price'>Preço do produto</label>
    <CurrencyInputField
    id="product-price"
    name="product-price"
    placeholder="R$ 0,00"
    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
    onValueChange={(value, name) => console.log(value, name)}
    className='text-dark border border-white rounded-md p-2 bg-white focus:outline-0 focus:ring focus:ring-primary'
  />
  </div>
  )
}

export const currencyFormat = (number:number, style: 'decimal' | 'currency' | 'percent' = 'currency') => {
    return new Intl.NumberFormat('pt-br', { style: style, currency: 'BRL',maximumFractionDigits:2 }).format(number ? number : 0)
}
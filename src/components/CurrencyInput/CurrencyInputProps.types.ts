import { CurrencyInputOnChangeValues } from "react-currency-input-field/dist/components/CurrencyInputProps"

export type CurrencyInputProps = {
    label:string
    defaultValue?:string
    value?:string
    onChange:(value: string | undefined, name: string  | undefined, values?: CurrencyInputOnChangeValues | undefined) => void
    name:string
    id:string
}
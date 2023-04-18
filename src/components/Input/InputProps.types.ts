export type InputProps = {
    label:string
    defaultValue?:string
    value?:string
    onChange:React.ChangeEventHandler<HTMLInputElement>
    name:string
    id:string
    placeholder:string
    type:string
    adornment:React.ReactNode
}
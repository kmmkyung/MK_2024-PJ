import { InputHTMLAttributes } from "react";

interface IInputProps{
  errors?: string[];
  name: string;
}

export default function Input({errors = [],name, ...rest}:IInputProps & InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="*:text-sm">
      <input name={name} className="bg-transparent rounded-md w-full h-10 ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition" {...rest} />
      {errors.map((ele,idx)=>{
        return <p key={idx} className="text-red-500 mt-3">{ele}</p>
      })}
    </div>
  )
}
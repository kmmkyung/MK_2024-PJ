import { InputHTMLAttributes } from "react";

interface IInputProps{
  errors?: string[];
  name: string;
}

export default function Input({errors = [],name, ...rest}:IInputProps & InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="*:text-sm w-full">
      <input name={name} className={`bg-transparent rounded-md w-full h-10 ring-2 focus:ring-3  focus:ring-primary border-none placeholder:text-neutral-400 transition-all disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed read-only:text-neutral-300 read-only:cursor-not-allowed ${errors.length>0? "ring-red-500" : "ring-neutral-400"}`} {...rest} />
      {errors.map((ele,idx)=>{
        return <p key={idx} className="text-red-500 mt-3">{ele}</p>
      })}
    </div>
  )
}
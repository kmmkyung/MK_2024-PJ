interface IFormInputProps{
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({type,placeholder,required,errors}:IFormInputProps){
  return (
    <div>
      <input className="bg-transparent rounded-md w-full h-10 ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition" 
      type={type} placeholder={placeholder} required={required}/>
      {errors.map((ele,idx)=>{
        return <p key={idx} className="text-red-500 mt-3">{ele}</p>
      })}
    </div>
  )
}
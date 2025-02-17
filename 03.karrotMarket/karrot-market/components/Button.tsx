"use client"

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface IButtonProps{
  text: string;
}

export default function Button({text, ...rest}:IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>){
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} {...rest} className="text-sm primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" type="submit">{pending? '🥕Loading🥕' : text}</button>
  )
}
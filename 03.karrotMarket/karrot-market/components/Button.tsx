"use client"

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface IButtonProps{
  text: string;
  uploading?: boolean;
}

export default function Button({text, uploading, ...rest}:IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>){
  const { pending } = useFormStatus();

  return (
    <button disabled={uploading||pending} {...rest} className="text-sm primary-btn" type="submit">{pending? '🥕Loading🥕' : text}</button>
  )
}
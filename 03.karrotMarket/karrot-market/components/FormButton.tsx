"use client"

import { useFormStatus } from "react-dom";

interface IFormButtonProps{
  text: string;
}

export default function FormButton({text}:IFormButtonProps){
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed" type="submit">{pending? '🥕로딩중입니다🥕' : text}</button>
  )
}
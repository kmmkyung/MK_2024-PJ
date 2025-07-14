"use client"

import { ButtonHTMLAttributes, useMemo } from "react";
import { useFormStatus } from "react-dom";

interface IButtonProps{
  text: string;
  uploading?: boolean;
}

export default function Button({text, uploading, ...rest}:IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>){
  const { pending } = useFormStatus();
  const isDisabled = uploading || pending;

  const buttonText = useMemo(() => {
    if (uploading) return "이미지를 그리는 중...";
    if (pending) return "🥕Loading🥕";
    return text;
  }, [uploading, pending, text]);

  return (
    <button disabled={isDisabled} {...rest} className="text-sm primary-btn" type="submit">
      {buttonText}
    </button>
  )
}
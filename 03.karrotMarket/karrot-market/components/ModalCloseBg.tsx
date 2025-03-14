'use client'

import { useRouter } from "next/navigation";

export default function ModalCloseBg(){
  const router = useRouter();

  function onCloseClick(){
    router.back();
  }

  return (
    <div className="absolute w-full h-full left-0 top-0 bg-opacity-80 bg-black" onClick={onCloseClick}>
    </div>
  )
}
'use client'

import { useRouter } from "next/navigation";

export default function ModalCloseBg(){
  const router = useRouter();

  function onCloseClick(){
    router.back();
  }

  return (
    <div className="absolute w-full h-full bg-opacity-80 bg-black" onClick={onCloseClick}>
    </div>
  )
}
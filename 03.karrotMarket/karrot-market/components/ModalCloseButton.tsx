'use client'

import { XMarkIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation";

export default function ModalCloseButton(){
  const router = useRouter();

  function onCloseClick(){    
    router.back();
  }

  return (
    <button className="absolute right-5 top-5 text-neutral-200" onClick={onCloseClick}>
      <XMarkIcon className="size-10"/>
    </button>
  )
}
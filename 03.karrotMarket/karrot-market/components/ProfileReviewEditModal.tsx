"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Button from "./Button";
import { updateReview } from "@/app/(ChatsDetail)/chats/[id]/review/action";

export default function ProfileReviewEditModal({reviewId,reviewPayload,setModalOpen}:{reviewId:number,reviewPayload:string,setModalOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [payload, setPayload] = useState(reviewPayload);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onsubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await updateReview(reviewId, payload);    
    if(result?.error){
      setSuccess(false);
      setError(result.error);
    }
    else{
      setSuccess(true);
      setTimeout(()=> {setModalOpen(false);}, 3000);
    }
  }

  function onClose(){
    setModalOpen(false);
  }

  return (
    <div className="fixed top-0 left-0 z-[51] w-full h-full px-10 py-20 flex justify-center items-center">
      <div className="absolute w-full h-full bg-opacity-80 bg-black" onClick={onClose}/>
      <div className="relative rounded-lg overflow-hidden bg-white dark:bg-neutral-900 max-w-[500px] max-h-[600px] w-full h-full p-5">
        <div className="flex justify-between items-center">
          <p className="text-sm text-primary font-semibold">리뷰 수정하기</p>
          <button className="p-3" onClick={onClose}>
            <XMarkIcon className="size-5"/>
          </button>
        </div>
        <form onSubmit={onsubmit} className="mt-5 w-full h-[calc(100%-64px)] flex flex-col justify-between">
          <div className="h-1/2">
            <textarea minLength={1} onChange={(e) => setPayload(e.target.value)} maxLength={100} value={payload} placeholder="거래 후기를 5자 이상 100자 이하 작성해주세요" className="h-full align-middle text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all" />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          {success && <p className="text-center text-sm text-primary font-semibold">🥳 수정완료!<br/>3초 후 닫힙니다.</p>}
          <Button text="리뷰 제출하기"/>
        </form> 
      </div>
    </div>
  )
}
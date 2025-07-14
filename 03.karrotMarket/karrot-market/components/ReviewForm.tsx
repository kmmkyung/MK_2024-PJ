'use client'

import { useEffect, useState } from "react"
import Button from "./Button"
import { saveReview } from "@/app/(ChatsDetail)/chats/[id]/review/action"
import { redirect } from "next/navigation"


export interface ReviewFormProps {
  users: {
    id: number;
  }[]
  product: { photo: string; userId: number; dealt: boolean };
  id: string;
  created_at: Date;
  updated_at: Date;
  productId: number;
}

export default function ReviewForm({room}:{room: ReviewFormProps}) {
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5)

  async function onsubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await saveReview(room, payload)
    if (result?.error) {
      setError(result.error);
    }
    if(result?.success) {
      setSuccess(true);
      setError(null);
      setPayload("");
    }
  }

  useEffect(()=>{
    if (!success) return
    const timer = setInterval(()=>{
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          redirect("/products") // ✅ 이동 경로
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  },[success])

  return (
    <>
    <form onSubmit={onsubmit} className="w-full">
      <div className="my-10">
        <textarea minLength={5} onChange={(e) => setPayload(e.target.value)} maxLength={100} value={payload} placeholder="거래 후기를 5자 이상 100자 이하 작성해주세요" className="whitespace-pre-wrap align-middle h-20 text-sm bg-transparent rounded-md w-full ring-2 focus:ring-3 ring-neutral-400 focus:ring-primary border-none placeholder:text-neutral-400 transition-all" />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <Button text="리뷰 제출하기"/>
    </form> 
    {success && <>
    <div className="fixed z-[51] top-0 left-0 bg-opacity-80 bg-black w-screen h-screen"/>
    <div className="absolute z-[51] rounded-md bg-yellow-200 size-96 flex items-center justify-center flex-col gap-1">
      <span className="text-6xl">🥳</span>
      <p className="text-center text-sm text-black">리뷰가 성공적으로 작성되었습니다!</p>
      <p className="text-center text-sm text-black">
        <strong className="text-base">{countdown}</strong> 후에 쇼핑 페이지로 이동합니다.
      </p>
    </div>
    </>
    }
    </>
  )
}
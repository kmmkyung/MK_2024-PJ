"use client"

import { uploadPost } from "@/app/(LifeDetail)/post/add/action";
import Button from "@/components/Button";
import { useActionState } from "react";


export default function PostAddForm(){
  const [ state, action ] = useActionState(uploadPost, null)

  return (
    <form action={action} className="h-full bg-neutral-100 shadow-lg shadow-neutral-200/50 rounded-lg p-5 dark:bg-neutral-800 dark:shadow-neutral-800/50 ">
      <input name="title" placeholder="제목을 입력해 주세요" required className="text-sm w-full placeholder:text-neutral-400 border-none rounded-md focus:ring-0 dark:bg-black"/>
      <textarea name="description" placeholder="내용을 작성해 주세요" required className="mt-2 align-middle h-[calc(100%-92px)] text-sm bg-transparent rounded-md w-full border-none placeholder:text-neutral-400 mb-2 focus:ring-0" />
      {state?.fieldErrors.description && state.fieldErrors.description.map((ele,idx)=>{
        return <p key={idx} className="text-red-500 mt-3 text-sm">{ele}</p>
      })}
      <Button text="완료"/>
    </form>
  )
}
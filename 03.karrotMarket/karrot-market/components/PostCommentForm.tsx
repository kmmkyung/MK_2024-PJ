"use client"

import { addComment } from "@/app/(LifeDetail)/post/[id]/action";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react";



export default function PostCommentForm({postId}:{postId:number}){
  const initialState = {
    postId : postId
  }

  const [state, formAction] = useActionState(addComment, initialState)


  return (
    <div className="box-border h-[80] border-t border-neutral-300 dark:border-neutral-700 fixed w-full px-10 py-5 bottom-0 left-0 bg-white dark:bg-neutral-900">
      <form action={formAction} className="flex gap-5 md:max-w-screen-xl mx-auto">
        <input name="comment" type="text" className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
        <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0"><PaperAirplaneIcon className="size-5 text-white"/></button>
      </form>
    </div>
  )
}
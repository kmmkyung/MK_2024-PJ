"use client"

import { addComment } from "@/app/(LifeDetail)/post/[id]/action";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react";

export default function PostCommentForm({postId}:{postId:number}){
  function addCommentWithPostId(_: unknown, formData: FormData){
    return addComment(formData, postId);
  }
  const [state, formAction] = useActionState(addCommentWithPostId, null);
  
  return (
    <>
    <div className="box-border h-[80] border-t border-neutral-300 dark:border-neutral-700 fixed w-full px-10 py-5 bottom-0 left-0 bg-white dark:bg-neutral-900">
      {state?.formErrors ? <p className="absolute left-1/2 -top-3 -translate-x-1/2 text-red-500 text-xs px-4 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">{state.formErrors}</p> : null}
      <form action={formAction} className="flex gap-5 md:max-w-screen-xl mx-auto">
        <input name="comment" type="text" placeholder="댓글을 입력해 주세요" min={1} max={200} className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
        <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0"><PaperAirplaneIcon className="size-5 text-white"/></button>
      </form>
    </div>
    </>
  )
}
"use client"

import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useActionState, useOptimistic } from "react";

interface IPostInput {
  comment?:{
    id:number;
    userId:number;
    payload:string;
    created_at:Date;
    user:{
      username:string;
      avatar:string|null;
    },
  }[],
  commentCount:number;
}

export default function PostInput(props:IPostInput){
  const {comment} = props
  console.log(comment);
  
  // const [state, formAction] = useActionState(addComment, null)

  return (
    <>
    <div className="mt-10 pt-10 border-t border-neutral-300 dark:border-neutral-700">
      <div className="text-sm text-neutral-500 flex items-center gap-1">
        <ChatBubbleBottomCenterTextIcon className="size-3"/>
        <p>댓글</p>
        <p>{props.commentCount}</p>
      </div>
      {comment !== undefined && comment.length>0?
        <div className="mt-5">
        {comment.map((ele) => {
          return <div key={ele.id}>
            <div className="flex items-start gap-2">
              <Image className="rounded-full" width={40} height={40} sizes="40px" src={ele.user.avatar!} alt={ele.user.username}/>
              <div className="">
                <p className="flex flex-col items-start justify-center gap-1">
                  <span className="text-xs font-semibold">{ele.user.username}</span>
                  <span className="text-xs text-neutral-500">{formatToTimeAgo(ele.created_at.toString())}</span>
                </p>
                <p className="text-sm mt-2">{ele.payload}</p>
              </div>
            </div>
          </div>
        })}
        </div>
        : <div className="min-h-20 flex items-center justify-center"><p className="text-xs text-neutral-500">아직 등록된 댓글이 없습니다.</p></div>
      }
    </div>
    <div className="box-border h-[80] border-t border-neutral-300 dark:border-neutral-700 fixed w-full px-10 py-5 bottom-0 left-0 bg-white dark:bg-neutral-900">
      <form className="flex gap-5 md:max-w-screen-xl mx-auto">
        <input name="comment" type="text" className="rounded-full border-0 bg-neutral-100 dark:bg-neutral-800 focus:ring-0 text-sm w-full"/>
        <button type="submit" className="size-9 rounded-full bg-primary hover:bg-primaryHover transition-all flex items-center justify-center flex-shrink-0"><PaperAirplaneIcon className="size-5 text-white"/></button>
      </form>
    </div>
    </>
  )
}
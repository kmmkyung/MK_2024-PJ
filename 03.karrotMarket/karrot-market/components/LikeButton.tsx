"use client"

import { HandThumbUpIcon as SolidHandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { startTransition, useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(LifeDetail)/post/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export default function LikeButton({isLiked, likeCount, postId}:LikeButtonProps){

  const [state, reducerFn] = useOptimistic({isLiked, likeCount}, (previousState)=>{
    return {isLiked:!previousState.isLiked,
      likeCount:previousState.isLiked? previousState.likeCount-1 : previousState.likeCount+1}
    })

  async function onClick(){
    startTransition(() => {
      reducerFn(undefined);
    });
    if(state.isLiked){
      await dislikePost(postId);
    }
    else {
      await likePost(postId);
    }
  }

  return (
    <button onClick={onClick} className={`box-border p-2 rounded-full border transition-all
      ${state.isLiked ? "bg-primary text-white border-primary" : "border-neutral-500"}`}>
      <p className="flex items-center gap-1 text-xs">
        {state.isLiked ? <SolidHandThumbUpIcon className="size-3"/> : <OutlineHandThumbUpIcon className="size-3"/>}
        {state.likeCount}
      </p>
    </button>
  )
}
"use client"

import { deletePost } from "@/app/(LifeDetail)/post/[id]/action";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function PostDelete({postId}:{postId:number}){

  async function onDelete(postId:number){    
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    await deletePost(postId)
  }

  return (
      <form action={()=>onDelete(postId)}>
        <button><TrashIcon className="text-neutral-500 size-5"/></button>
      </form>
  )
}
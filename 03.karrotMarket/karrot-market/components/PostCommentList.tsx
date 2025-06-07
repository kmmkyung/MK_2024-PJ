"use client"

import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import PostCommentForm from "./PostCommentForm";
import { addComment, deleteComment } from "@/app/(LifeDetail)/post/[id]/action";
import { useActionState, useOptimistic } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

interface InitialComment {
  id: number;
  userId: number;
  payload: string;
  created_at: Date;
  user: {
    username: string;
    avatar: string | null;
  };
};

interface IPostInput {
  commentData:InitialComment[],
  commentCount:number;
  postId:number
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}

export default function PostCommentList(props:IPostInput){
  const {commentData, commentCount, postId, user} = props;
  
  const [commentState, reducerFn] = useOptimistic(
    commentData, (previousState, newComment: InitialComment) => {
      return [...previousState, newComment];
  });

  async function addCommendFn(_: unknown, formData: FormData){
    const result = await addComment(formData, postId);
    return result; 
  };

  const [state, formAction] = useActionState(addCommendFn, null);

  // form action 시 실행
  // 임시 데이터 전달해 UI업데이트 -> 서버엑션 호출 -> addCommendFn 실행
  function handleSubmit(formData: FormData){
    const payload = formData.get("comment");    
    if (typeof payload === "string" && payload.trim() !== '') {
      reducerFn({
        id: Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`),
        userId: user.id,
        payload: payload,
        created_at: new Date(),
        user: { username: user.username, avatar: user.avatar },
      });
    }
    formAction(formData);
  };

  async function onDelete(commentId:number){    
    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;
    await deleteComment(commentId,postId)
  }

  return (
    <>
    <div className="mt-10 pt-10 border-t border-neutral-300 dark:border-neutral-700">
      <div className="text-sm text-neutral-500 flex items-center gap-1">
        <ChatBubbleBottomCenterTextIcon className="size-3"/>
        <p>댓글</p>
        <p>{commentCount}</p>
      </div>
      {commentState !== undefined && commentState.length>0?
        <div className="mt-5">
        {commentState.map((ele) => {
          return <div className="mb-5 last:mb-0" key={ele.id}>
            <div className="flex justify-between">
              <div className="flex items-start gap-2">
                <Image className="rounded-full size-5" width={40} height={40} sizes="40px" src={ele.user.avatar!} alt={ele.user.username}/>
                <div>
                  <p className="flex flex-col items-start justify-center gap-1">
                    <span className="text-xs font-semibold">{ele.user.username}</span>
                    <span className="text-xs text-neutral-500">{formatToTimeAgo(ele.created_at.toString())}</span>
                  </p>
                  <p className="text-sm mt-2 break-all">{ele.payload}</p>
                </div>
              </div>
              { user.id === ele.userId ? 
                <form action={()=>onDelete(ele.id)}>
                  <button>
                    <TrashIcon className="text-neutral-500 size-3"/>
                  </button>
                </form>
              : null }
            </div>
          </div>
        })}
        </div>
        : <div className="min-h-20 flex items-center justify-center"><p className="text-xs text-neutral-500">아직 등록된 댓글이 없습니다.</p></div>
      }
    </div>
    <PostCommentForm state={state} handleSubmit={handleSubmit}/>
</>
  )
}

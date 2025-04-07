import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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

export default function PostCommentList(props:IPostInput){
  const {comment} = props

  return (
    <div className="mt-10 pt-10 border-t border-neutral-300 dark:border-neutral-700">
      <div className="text-sm text-neutral-500 flex items-center gap-1">
        <ChatBubbleBottomCenterTextIcon className="size-3"/>
        <p>댓글</p>
        <p>{props.commentCount}</p>
      </div>
      {comment !== undefined && comment.length>0?
        <div className="mt-5">
        {comment.map((ele) => {
          return <div key={ele.id} className="mb-5 last:mb-0">
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
  )
}
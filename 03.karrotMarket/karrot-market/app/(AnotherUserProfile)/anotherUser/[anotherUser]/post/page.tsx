"use client"

import NavProfile from "@/components/NavProfile";
import PageNation from "@/components/PageNation";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";


export default function AnotherPost() {
  const { userPosts, anotherUserId } = useUserContext();
  const [page, setPage] = useState(1);
  const paginatedPosts = userPosts?.slice((page - 1) * 5, page * 5); 
  
  return (
    <section className="px-10 py-10 h-full w-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">동네활동</h6>
        <NavProfile userId={anotherUserId}/>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-44px)]">
        {/* 작성한 글 */}
        {userPosts && (
          userPosts?.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-neutral-500 text-sm">작성한 글이 없습니다.</p>
            </div>
          ) : (
            <ol className="grid grid-rows-5 gap-5 h-full">
              {paginatedPosts?.map((post) => (
                <li key={post.id} className="py-2 px-4 dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
                  <Link href={`/post/${post.id}`} onClick={()=>sessionStorage.setItem('cameFromProfileItem', 'true')}>
                    <h6 className="text-sm default-textColor">{post.title}</h6>
                    <p className="text-sm mt-2 text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">{post.description}</p>
                    <div className="flex justify-end gap-4 mt-2 text-neutral-500">
                      <p className="flex items-center gap-1 text-xs"><EyeIcon className="size-3"/>{post.views}</p>
                      <p className="flex items-center gap-1 text-xs"><ChatBubbleBottomCenterTextIcon className="size-3"/>{post._count.comment}</p>
                      <p className="flex items-center gap-1 text-xs"><HandThumbUpIcon className="size-3"/>{post._count.like}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )
        )}
        { userPosts?.length !==0 &&
          <PageNation itemLength={userPosts?.length || 0} currentPage={page} onPageChange={(page) => setPage(page)}/>
        }
      </div>
    </section>
  )
}
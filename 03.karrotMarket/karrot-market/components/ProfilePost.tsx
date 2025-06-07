'use client'

import { useUserContext } from "@/context/userContext";
import NavProfile from "./NavProfile";

export default function ProfilePost() {
  const { userPosts } = useUserContext();

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">동내활동</h6>
        <NavProfile/>
      </div>
      {/* 작성한 리뷰 */}
      {userPosts && (
        userPosts?.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100%-74px)]">
            <p className="text-neutral-500 text-sm">작성한 글이 없습니다.</p>
          </div>
        ) : (
          <ol className="grid grid-rows-5 gap-5">
            {userPosts?.map((post) => (
              <li key={post.id} className="p-2 dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden flex gap-2 items-center">
                <h6 className="text-sm default-textColor">{post.description}</h6>
              </li>
            ))}
          </ol>
        )
      )}
    </div>
  );
}
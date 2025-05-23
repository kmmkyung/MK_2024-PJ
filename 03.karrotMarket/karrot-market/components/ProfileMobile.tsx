"use client";

import Image from "next/image";
import { ArrowLeftStartOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { logOut } from "@/app/(Tabs)/profile/action";
import { useUserContext } from "@/context/userContext";

export default function ProfileMobile({children}:{children: React.ReactNode}) {
  const { user } = useUserContext();

  return (
    <section className="pt-[60px] pb-[70px] min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-screen-xl min-h-[calc(100vh-170px)] mx-auto grid grid-cols-1 gap-5">
        <div className="w-full flex-shrink-0 rounded-md overflow-hidden bg-white dark:bg-neutral-800">
          {/* 사진 & 닉네임 */}
          <div className="setting-profileBox py-4">
            <h1 className="font-bold text-xl pb-4 flex gap-2">
              <span className="flex-shrink-0
                bg-gradient-to-r from-orange-500 via-lime-500 to-orange-500
                bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] 
              ">반가워요!</span>
              <span className="text-ellipsis whitespace-nowrap overflow-hidden">{user.username}님</span>
            </h1>
            <Link href={"/profile/edit"}>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Image className="flex-shrink-0 size-10 rounded-full overflow-hidden" width={40} height={40} src={user.avatar ?? "/image/rabbit.png"} alt={user.username}/>
                  <h3 className="text-base font-semibold default-textColor text-ellipsis whitespace-nowrap overflow-hidden">{user.username}</h3>
                </div>
                <ChevronRightIcon className="flex-shrink-0 w-5 h-5 text-neutral-500"/>
              </div>
            </Link>
          </div>
          {/* 판매내역 */}
          <div className="mt-2">
            <div className="setting-profileBox">
              <Link href={"/profile/sell"}>
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-sm font-semibold default-textColor">판매내역</h3>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
                </div>
              </Link>
            </div>
            {/* 구매내역 */}
            <div className="setting-profileBox">
              <Link href={"/profile/buy"}>
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-sm font-semibold default-textColor">구매내역</h3>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
                </div>
              </Link>
            </div>
            {/* 리뷰 */}
            <div className="setting-profileBox">
              <Link href={"/profile/review"}>
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-sm font-semibold default-textColor">리뷰</h3>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
                </div>
              </Link>
            </div>
            {/* 작성글 */}
            <div className="setting-profileBox">
              <Link href={"/profile/post"}>
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-sm font-semibold default-textColor">동내활동</h3>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
                </div>
              </Link>
            </div>
            {/* 로그아웃 */}
            <div className="setting-profileBox pt-0">
              <form action={logOut} className="pt-2 border-t border-neutral-100 dark:border-neutral-900">
                <button className="text-sm font-semibold py-3 flex items-center justify-between w-full">로그아웃
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-neutral-500"/>
                </button>
              </form>
            </div>
          </div>
        </div>
        <main className="min-h-full bg-white dark:bg-neutral-800 w-full h-auto rounded-md">
          {children}
        </main>
      </div>
    </section>
  )
}
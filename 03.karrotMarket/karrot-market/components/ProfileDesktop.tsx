"use client";

import Image from "next/image";
import { ArrowLeftStartOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { logOut } from "@/app/(Tabs)/profile/action";
import { useUserContext } from "@/context/userContext";

export default function ProfileDesktop({children}:{children: React.ReactNode}) {
  const { user, userProducts, userBuyProducts, userPosts, userReviews } = useUserContext();

  return (
    <section className="pt-[60px] pb-[70px] h-screen md:bg-neutral-100 md:dark:bg-neutral-900">
      <div className="my-5 flex flex-col items-start md:flex-row gap-5 max-w-screen-xl mx-auto h-full px-10">
        <div className="w-full md:basis-2/5 flex-shrink-0 rounded-md overflow-hidden">
          {/* 사진 & 닉네임 */}
          <div className="setting-profileBox py-4">
            <h1 className="font-bold text-xl md:border-b border-neutral-100 dark:border-neutral-900 pb-4">
              <span className="text-primary">반가워요!</span> {user?.username}님
            </h1>
            <Link href={"/profile/edit"}>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <Image className="size-10 rounded-full overflow-hidden" width={40} height={40} src={user.avatar!} alt={user.username}/>
                  <h3 className="text-base font-semibold default-textColor">{user.username}</h3>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
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
              <form action={logOut} className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900">
                <button className="text-sm font-semibold py-3">로그아웃</button>
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-neutral-500"/>
              </form>
            </div>
          </div>
        </div>
        <main className="px-10 py-10 bg-white dark:bg-neutral-800 w-full h-full rounded-md">
          {children}
        </main>
      </div>
    </section>
  )
}
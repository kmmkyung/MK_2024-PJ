"use client";

import Image from "next/image";
import { ArrowLeftStartOnRectangleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { logOut } from "@/app/(Tabs)/profile/action";
import { useUserContext } from "@/context/userContext";
import { usePathname } from "next/navigation";

export default function ProfileMenu({children}:{children: React.ReactNode}) {
  const { user, userAnother } = useUserContext();
  const pathName = usePathname();
  const href = user ? "/profile" : `/anotherUser/${userAnother?.id}`;

  return (
    <section className="pt-[60px] pb-[70px] min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="md:my-5 max-w-screen-xl md:min-h-[calc(100vh-170px)] mx-auto md:px-10 grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr]">
        <div>
          <div className="md:rounded-xl md:overflow-hidden *:bg-white *:dark:bg-neutral-800">
            <div className="setting-profileBox py-4">
              { user?
                <>
                  <h1 className="font-bold text-xl md:border-b border-neutral-100 dark:border-neutral-900 pb-4 flex gap-2">
                    <span className="flex-shrink-0
                      bg-gradient-to-r from-orange-500 via-lime-500 to-orange-500
                      bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] 
                    ">반가워요!</span>
                    <span className="text-ellipsis whitespace-nowrap overflow-hidden">{user?.username}님</span>
                  </h1>
                  <Link href={"/profile/edit"}>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <Image className="flex-shrink-0 size-10 rounded-full overflow-hidden" width={40} height={40} src={user?.avatar ?? "/image/rabbit.png"} alt={user!.username}/>
                        <h3 className="text-base font-semibold default-textColor text-ellipsis whitespace-nowrap overflow-hidden">{user?.username}</h3>
                      </div>
                      <ChevronRightIcon className="flex-shrink-0 w-5 h-5 text-neutral-500"/>
                    </div>
                  </Link>
                </>
                :
                <div className="flex items-center gap-3 min-w-0">
                  <Image className="flex-shrink-0 size-10 rounded-full overflow-hidden" width={40} height={40} src={userAnother?.avatar ?? "/image/rabbit.png"} alt={userAnother!.username}/>
                  <h3 className="text-base font-semibold default-textColor text-ellipsis whitespace-nowrap overflow-hidden">{userAnother?.username}</h3>
                </div>
              }
            </div>
            <div className="mt-2">
              {/* 판매내역 */}
              <div className="setting-profileBox">
                <Link href={`${href}/sell`}>
                  <div className="flex items-center justify-between py-3">
                    <h3 className={`text-sm font-semibold default-textColor ${pathName === '/profile/sell' || pathName === `/profile/${userAnother?.id}/sell`? 'text-primary':'default-textColor'}`}>판매내역</h3>
                    <ChevronRightIcon className={`w-5 h-5 ${pathName === '/profile/sell' || pathName === `/profile/${userAnother?.id}/sell`? 'text-primary':'text-neutral-500'}`}/>
                  </div>
                </Link>
              </div>
              {/* 구매내역 */}
              { user?
              <div className="setting-profileBox">
                <Link href={"/profile/buy"}>
                  <div className="flex items-center justify-between py-3">
                    <h3 className={`text-sm font-semibold default-textColor ${pathName === '/profile/buy' ? 'text-primary':'default-textColor'}`}>구매내역</h3>
                    <ChevronRightIcon className={`w-5 h-5 ${pathName === '/profile/buy'? 'text-primary':'text-neutral-500'}`}/>
                  </div>
                </Link>
              </div>
              : null }
              {/* 리뷰 */}
              <div className="setting-profileBox">
                <Link href={`${href}/review`}>
                  <div className="flex items-center justify-between py-3">
                    <h3 className={`text-sm font-semibold default-textColor ${pathName === '/profile/review' || pathName === `/profile/${userAnother?.id}/review` ? 'text-primary':'default-textColor'}`}>리뷰</h3>
                    <ChevronRightIcon className={`w-5 h-5 ${pathName === '/profile/review' || pathName === `/profile/${userAnother?.id}/review` ? 'text-primary':'text-neutral-500'}`}/>
                  </div>
                </Link>
              </div>
              {/* 작성글 */}
              <div className="setting-profileBox">
                <Link href={`${href}/post`}>
                  <div className="flex items-center justify-between py-3">
                    <h3 className={`text-sm font-semibold default-textColor ${pathName === '/profile/post' || pathName === `/profile/${userAnother?.id}/post` ? 'text-primary':'default-textColor'}`}>동내활동</h3>
                    <ChevronRightIcon className={`w-5 h-5 ${pathName === '/profile/post' || pathName === `/profile/${userAnother?.id}/post` ? 'text-primary':'text-neutral-500'}`}/>
                  </div>
                </Link>
              </div>
              {/* 로그아웃 */}
              { user ?
              <div className="setting-profileBox pt-0">
                <form action={logOut} className="pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  <button className="text-sm font-semibold py-3 flex items-center justify-between w-full">로그아웃
                  <ArrowLeftStartOnRectangleIcon className="w-5 h-5 text-neutral-500"/>
                  </button>
                </form>
              </div>
              : null }
            </div>
          </div>
        </div>
        <main className="min-h-[calc(100vh-50%)] sm:h-full bg-white dark:bg-neutral-800 w-full md:rounded-xl">
          {children}
        </main>
      </div>
    </section>
  )
}
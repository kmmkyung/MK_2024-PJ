import { getUserBuyProducts, getUserPosts, getUserProducts, getUserReviews, getUserSendReviews } from "@/app/(Tabs)/profile/action";
import Image from "next/image";
import { getAnotherUser } from "./action";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default async function AnotherUser({params}:{ params: {anotherUser: number}}) {
  const { anotherUser } = await params;
  const anotherUserId = Number(anotherUser);
  const [ user, userProducts, userBuyProducts, userPosts, userReviews, userSendReview] = await Promise.all([
    getAnotherUser(anotherUserId),
    getUserProducts(anotherUserId),
    getUserBuyProducts(anotherUserId),
    getUserPosts(anotherUserId),
    getUserReviews(anotherUserId),
    getUserSendReviews(anotherUserId),
  ]);

  return (
    <section className="pt-[60px] pb-[70px] min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="md:my-5 max-w-screen-xl min-h-[calc(100vh-170px)] mx-auto md:px-10 grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr]">
        <div className="w-full md:basis-2/5 flex-shrink-0 rounded-md overflow-hidden bg-white dark:bg-neutral-800">
          <div className="setting-profileBox py-4 flex items-center gap-3 min-w-0 md:border-b border-neutral-100 dark:border-neutral-900 pb-4">
            <Image className="flex-shrink-0 size-10 rounded-full overflow-hidden" width={40} height={40} src={user?.avatar ?? "/image/rabbit.png"} alt={user!.username}/>
            <h3 className="text-base font-semibold default-textColor text-ellipsis whitespace-nowrap overflow-hidden">{user?.username}</h3>
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
            {/* 리뷰 */}
            <div className="setting-profileBox">
              <Link href={"/profile/review"}>
                <div className="flex items-center justify-between py-3">
                  <h3 className="text-sm font-semibold default-textColor">리뷰</h3>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-500"/>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <main className="px-10 py-10 min-h-full bg-white dark:bg-neutral-800 w-full h-auto rounded-md">

        {/* 리뷰 섹션 */}
        <section className="pb-8">
          <h5 className="text-base font-semibold mb-5">✉️ 최근 받은 거래 리뷰</h5>
          {userSendReview.length === 0 ? (
            <p className="text-neutral-500 text-sm">받은 리뷰가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {userSendReview.slice(0,3).map((review) => (
                <li key={review.id} className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg flex gap-2 not-first:mt-2">
                  <Image className="flex-shrink-0 size-5 rounded-full overflow-hidden" width={40} height={40} src={review.author.avatar ?? "/image/rabbit.png"} alt={review.author.username}/>
                  <p className="text-sm text-ellipsis overflow-hidden">{review.payload}</p>
                </li>
              ))}    
            </ul>
          )}
        </section>

        {/* 판매 상품 목록 */}
        <section className="pt-8">
          <h5 className="text-base font-semibold mb-5">최근 판매 중인 상품</h5>
          {userProducts.length === 0 ? (
            <p className="text-neutral-500 text-sm">판매 중인 상품이 없습니다.</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {userProducts.slice(0,2).map((product) => (
                <li key={product.id} className="dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
                  <Image width={300} height={300} src={product.photo} alt={product.title} className="size-auto aspect-square object-cover" />
                  <div className="p-2">
                    <h6 className="font-semibold text-sm text-ellipsis whitespace-nowrap overflow-hidden">{product.title}</h6>
                    <p className={`mt-2 font-semibold text-xs ${product.dealt ? "text-green-600" : "text-red-600"}`}>
                      {product.dealt ? "판매 완료" : "판매 중"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        </main>
      </div>
    </section>
  )

}
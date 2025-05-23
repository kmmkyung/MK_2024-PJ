'use client'

import { useUserContext } from "@/context/userContext";
import Image from "next/image";

export default function ProfileDashboard(){
  const { user, userProducts, userBuyProducts, userPosts, userSendReview } = useUserContext();

  return (
    <>
      <h5 className="text-xl font-bold text-primaryHover">{user.username}님의 활동 내역을 확인해보세요!</h5>
    {/* 요약 카드 */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-b border-neutral-100 dark:border-neutral-900">
      <div className="px-5 py-8 rounded-xl shadow-lg dark:shadow-neutral-900 flex justify-between items-center gap-2">
        <h6 className="text-base font-semibold break-keep whitespace-normal">판매 상품</h6>
        <p className="text-3xl font-bold">{userProducts.length}</p>
      </div>
      <div className="p-5 rounded-xl shadow-lg dark:shadow-neutral-900 flex justify-between items-center gap-2">
        <h6 className="text-base font-semibold break-keep whitespace-normal">구매 상품</h6>
        <p className="text-3xl font-bold">{userBuyProducts.length}</p>
      </div>
      <div className="p-5 rounded-xl shadow-lg dark:shadow-neutral-900 flex justify-between items-center gap-2">
        <h6 className="text-base font-semibold break-keep whitespace-normal">작성 글</h6>
        <p className="text-3xl font-bold">{userPosts.length}</p>
      </div>
    </div>

    {/* 리뷰 섹션 */}
    <section className="py-8">
      <h5 className="text-base font-semibold mb-5">✉️ 최근 나에게 온 리뷰</h5>
      {userSendReview.length === 0 ? (
        <p className="text-neutral-500 text-sm">아직 작성된 리뷰가 없습니다.</p>
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
      <h5 className="text-base font-semibold mb-5">🎁 최근 내가 판매 중인 상품</h5>
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
    </>
  )
}
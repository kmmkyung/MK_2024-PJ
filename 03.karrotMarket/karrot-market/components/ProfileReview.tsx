'use client'

import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavProfile from "./NavProfile";

export default function ProfileReview() {
  const { userReviews, userSendReview } = useUserContext();
  const [ reviewTab, setReviewTab ] = useState(sessionStorage.getItem('reviewTab') !== 'false');
  const [ sendReviewTab, setSendReviewTab ] = useState(sessionStorage.getItem('reviewTab') === 'false');

  useEffect(() => {
    sessionStorage.setItem('reviewTab', String(reviewTab));
  }, [reviewTab]);

  function tabClick(){
    setReviewTab(prv=> !prv);
    setSendReviewTab(prv=> !prv);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">리뷰</h6>
        <NavProfile/>
      </div>
      <ol className="text-sm font-semibold mb-10 flex justify-between *:border-b-2">
        <li className={`w-1/2 text-center pb-2 cursor-pointer transition-colors ${reviewTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>작성한 리뷰</li>
        <li className={`w-1/2 text-center cursor-pointer transition-colors ${sendReviewTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>받은 리뷰</li>
      </ol>
      {/* 판매 중인 상품 */}
      {reviewTab && (
        userReviews?.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100%-74px)]">
            <p className="text-neutral-500 text-sm">판매 중인 상품이 없습니다.</p>
          </div>
        ) : (
          <ol className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {userReviews?.map((product) => (
              <li key={product.id} className="dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
                <Link href={`/products/${product.id}`} className="flex items-center sm:block" onClick={()=>sessionStorage.setItem('cameFromProfileItem', 'true')}>
                  <div className="p-2">
                    <h6 className="text-sm text-ellipsis whitespace-nowrap overflow-hidden default-textColor">{product.title}</h6>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )
      )}
      {/* 판매 완료 상품 */}
      {sendReviewTab && (
        userSendReview?.length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100%-74px)]">
          <p className="text-neutral-500 text-sm">판매 완료인 상품이 없습니다.</p>
          </div>
          ) : (
          <ol className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            {userSendReview?.map((product) => (
              <li key={product.id} className="dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
              <Link href={`/products/${product.id}`} className="flex items-center sm:block" onClick={()=>sessionStorage.setItem('cameFromProfileItem', 'true')}>
                <div className="p-2">
                  <h6 className="text-sm text-ellipsis whitespace-nowrap overflow-hidden default-textColor">{product.title}</h6>
                </div>
              </Link>
            </li>
            ))}
          </ol>
        )
      )}
    </div>
  );
}
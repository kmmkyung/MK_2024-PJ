"use client"

import NavProfile from "@/components/NavProfile";
import PageNation from "@/components/PageNation";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import { useState } from "react";

export default function AnotherReview() {
  const { userReviews, anotherUserId } = useUserContext();
  const [ reviewPage, setReviewPage ] = useState(1);
  const paginatedReviews = userReviews?.slice((reviewPage - 1) * 5, reviewPage * 5);

  return (
    <section className="px-10 py-10 h-full w-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">리뷰</h6>
        <NavProfile userId={anotherUserId}/>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-44px)]">
        { userReviews?.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-neutral-500 text-sm">작성한 리뷰가 없습니다.</p>
            </div>
          ) : (
            <>
            <ol className="grid grid-rows-5 gap-5 h-full">
              {paginatedReviews?.map((review) => (
                <li key={review.id} className="p-2 dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden flex gap-2 items-center">
                  <Image className="flex-shrink-0 size-5 rounded-full overflow-hidden" width={40} height={40} src={review.author.avatar ?? "/image/rabbit.png"} alt={review.author!.username}/>
                  <p className="text-sm default-textColor">{review.payload}</p>
                </li>
              ))}
            </ol>
            </>
          )
        }
        { userReviews?.length !== 0 &&
        <PageNation itemLength={userReviews?.length || 0} currentPage={reviewPage} onPageChange={(reviewPage) => setReviewPage(reviewPage)}/>
        }
      </div>
    </section>
  )
}
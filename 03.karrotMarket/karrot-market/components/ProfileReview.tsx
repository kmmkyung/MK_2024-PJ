'use client'

import { useUserContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import NavProfile from "./NavProfile";
import Image from "next/image";
import ProfileReviewEditModal from "./ProfileReviewEditModal";
import { IUserReviews } from "@/app/(Tabs)/profile/action";


export default function ProfileReview() {
  const { userReviews, userSendReview } = useUserContext();
  const [ reviewTab, setReviewTab ] = useState(sessionStorage.getItem('reviewTab') !== 'false');
  const [ sendReviewTab, setSendReviewTab ] = useState(sessionStorage.getItem('reviewTab') === 'false');
  const [ selectedReview, setSelectedReview ] = useState<IUserReviews|null>(null);
  const [ modalOpen, setModalOpen ] = useState(false);

  function modalClick(review:IUserReviews) {
    setModalOpen(true);
    setSelectedReview(review)
  }

  useEffect(() => {
    sessionStorage.setItem('reviewTab', String(reviewTab));
  }, [reviewTab]);

  function tabClick(){
    setReviewTab(prv=> !prv);
    setSendReviewTab(prv=> !prv);
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-5">
          <h6 className="text-primary text-base font-semibold">리뷰</h6>
          <NavProfile/>
        </div>
        <ol className="text-sm font-semibold mb-10 flex justify-between *:border-b-2">
          <li className={`w-1/2 text-center pb-2 cursor-pointer transition-colors ${reviewTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>작성한 리뷰</li>
          <li className={`w-1/2 text-center cursor-pointer transition-colors ${sendReviewTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>받은 리뷰</li>
        </ol>
        {/* 작성한 리뷰 */}
        {reviewTab && (
          userReviews?.length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100%-74px)]">
              <p className="text-neutral-500 text-sm">작성한 리뷰가 없습니다.</p>
            </div>
          ) : (
            <>
            <ol className="grid grid-rows-5 gap-5">
              {userReviews?.map((review) => (
                <li key={review.id} onClick={()=>modalClick(review)} className="p-2 dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden flex gap-2 items-center">
                  <Image className="flex-shrink-0 size-5 rounded-full overflow-hidden" width={40} height={40} src={review.author.avatar ?? "/image/rabbit.png"} alt={review.author!.username}/>
                  <p className="text-sm default-textColor">{review.payload}</p>
                </li>
              ))}
            </ol>
            </>
          )
        )}
        {/* 받은 리뷰 */}
        {sendReviewTab && (
          userSendReview?.length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100%-74px)]">
            <p className="text-neutral-500 text-sm">받은 리뷰가 없습니다.</p>
            </div>
            ) : (
            <ol className="grid grid-rows-5 gap-5">
              {userSendReview?.map((review) => (
                <li key={review.id} className="p-2 dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden flex gap-2 items-center">
                  <Image className="flex-shrink-0 size-5 rounded-full overflow-hidden" width={40} height={40} src={review.author.avatar ?? "/image/rabbit.png"} alt={review.author!.username}/>
                  <p className="text-sm default-textColor">{review.payload}</p>
              </li>
              ))}
            </ol>
          )
        )}
      </div>
      {modalOpen && selectedReview && (
        <ProfileReviewEditModal reviewId={selectedReview.id} reviewPayload={selectedReview.payload} setModalOpen={setModalOpen}/>
      )}
    </>
  );
}
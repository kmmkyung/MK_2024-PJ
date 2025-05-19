"use client";

import { useUserContext } from "@/context/userContext";


export default function ProfileMobile({children}:{children: React.ReactNode}) {
  const { user, userProducts, userBuyProducts, userPosts, userReviews } = useUserContext();
  console.log(user, userProducts, userBuyProducts, userPosts, userReviews);
  
  return (
    <section className="setting-page">
      Mobile
      <main className="px-10 py-10 bg-white dark:bg-neutral-800 w-full h-full rounded-md">
        {children}
      </main>
    </section>
  )
}
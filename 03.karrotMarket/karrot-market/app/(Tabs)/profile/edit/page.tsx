"use client"

import { useUserContext } from "@/context/userContext";

export default function ProfileEdit() {
  const { user, userProducts, userBuyProducts, userPosts, userSendReview } = useUserContext();

  return (
    <div>
      <form>
        <h5 className="text-xl font-bold text-primaryHover">개인 정보 수정</h5>
        <div className="py-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">사용자 이름</label>
          <input type="text" defaultValue={user.username} className="w-full p-2 border rounded-md" />
        </div>
        <div className="py-8">
          <label className="block mb-2 text-sm font-medium text-gray-700">이메일</label>
          <input type="email" defaultValue={user.email} className="w-full p-2 border rounded-md" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">저장하기</button>
      </form>
    </div>
  )
}
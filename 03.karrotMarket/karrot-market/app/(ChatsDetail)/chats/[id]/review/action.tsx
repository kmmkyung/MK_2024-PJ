"use server"

import { ReviewFormProps } from "@/components/ReviewForm";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function saveReview(room:ReviewFormProps, payload:string) {
  if(payload.length<5) {return {error:"리뷰를 5자 이상 작성해주세요"}}

  const session = await getSession()
  if(session.id){    
    await db.review.create({
      data: {
        payload,
        userId: session.id,
        users: {
          connect: [
            { id: room.product.userId },
            { id: session.id },
          ],
        },
        productId: room.productId,
        chatRoomId: room.id,
      }
    })
    return {success:true}
  }
}
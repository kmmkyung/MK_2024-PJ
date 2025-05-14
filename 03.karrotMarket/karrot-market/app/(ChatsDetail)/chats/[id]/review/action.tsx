"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

const reviewSchema = z.string({required_error: "후기는 필수입니다"})
.trim().min(5,"5자 이상 입력해주세요")

export async function saveReview(_: unknown, formData: FormData){
  const data = formData.get('review')
  const result = reviewSchema.safeParse(data)
  if(!result.success){
    return result.error.flatten();
  }
  else {
    const session = await getSession()
    if(session.id){
      const review = await db.review.create({
        data: {
          // review: result.data,
          // userId: session.id,
          // users:,
          // productId: 
        }
      })
      // revalidateTag(`product-${formData.get('productId')}`)
      return { review }
    }
    else {
      return { errors: { formErrors: "로그인 후 이용해주세요" } }
    }
  }
}
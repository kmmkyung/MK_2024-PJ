"use server"

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const postSchema  = z.object({
  title: z.string({
    required_error: "게시물 제목은 필수입니다"
  }).trim().min(1,"게시물 제목은 필수입니다"),
  description: z.string({
    required_error: "내용 작성은 필수입니다"
  }).trim().min(1,"내용 작성은 필수입니다"),
})

export async function uploadPost(_: unknown, formData: FormData){
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
  }
  
  const result = postSchema.safeParse(data)
  if(!result.success){
    return result.error.flatten();
  }
  else {
    const session = await getSession()
    if(session.id){
      const post = await db.post.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          user: {
            connect: {
              id: session.id
            }
          }
        },
        select: {
          id: true
        }
      });
      revalidateTag('post-detail');
      redirect(`/post/${post.id}`);
    }
  }
}
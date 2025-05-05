"use server"

import { z } from "zod";
import fs from "fs/promises"
import db from "@/lib/db";
import { CategoryType } from "@prisma/client";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const categoryEnum = z.nativeEnum(CategoryType)

const productSchema  = z.object({
  photo: z.string().min(1, "상품 사진은 필수입니다"),
  title: z.string({
    required_error: "게시물 제목은 필수입니다"
  }).trim().min(1,"게시물 제목은 필수입니다"),
  price: z.coerce.number({
    required_error: "상품 가격은 필수입니다"
  }).min(1,"상품 가격은 필수입니다"),
  description: z.string({
    required_error: "상품 설명은 필수입니다"
  }).trim().min(1,"상품 설명은 필수입니다"),
  category: categoryEnum
})

export async function uploadProduct(_: unknown, formData: FormData){
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
    category: formData.get('category'),
  }
  
  if(data.photo instanceof File){
    const photoData = await data.photo.arrayBuffer()
    await fs.appendFile(`./public/product/${data.photo.name}`,
      Buffer.from(photoData)
    )
    data.photo = `/product/${data.photo.name}`
  }
  const result = productSchema.safeParse(data)
  if(!result.success){
    return result.error.flatten();
  }
  else {
    const session = await getSession()
    if(session.id){
      const product = await db.product.create({
        data: {
          photo: result.data.photo,
          title: result.data.title,
          price: result.data.price,
          description: result.data.description,
          category: result.data.category,
          dealt: false,
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
      revalidateTag('products')
      redirect(`/products/${product.id}`)
    }
  }
}
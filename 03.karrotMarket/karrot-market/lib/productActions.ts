'use server'

import { revalidateTag } from "next/cache"
import db from "./db"

export async function deleteProduct(numberId:number){
  await db.product.delete({
    where: {id:numberId},
    select: {photo:true}
  })
  revalidateTag('products')
}

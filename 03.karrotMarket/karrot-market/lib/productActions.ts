'use server'

import { revalidateTag } from "next/cache"
import db from "./db"
import fs from "fs/promises"

export async function deleteProduct(numberId:number){
  const deletedProduct = await db.product.delete({
    where: {id:numberId},
    select: {photo:true}
  })
  if(deletedProduct.photo){
    await fs.unlink(`public${deletedProduct.photo}`)
  }
  revalidateTag('products')
}

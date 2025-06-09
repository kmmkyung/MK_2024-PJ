'use server'

import { revalidateTag } from "next/cache"
import db from "./db"
import fs from "fs/promises"
import path from "path"

export async function deleteProduct(numberId:number){
  const deletedProduct = await db.product.delete({
    where: {id:numberId},
    select: {photo:true}
  })
  if(deletedProduct.photo){
    const fileName = path.basename(deletedProduct.photo)
    const filePath = path.join(process.cwd(), "public", "product", fileName)
    await fs.unlink(filePath)
  }
  revalidateTag('products')
}

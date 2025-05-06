"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";

async function getProduct(id:number){
  // await new Promise((r) => setTimeout(r, 10000));

  const product= await db.product.findUnique({
    where: { id: id },
    include: {
      user: {
        select: { username:true, avatar:true }
      },
      _count: {
        select: { chatRoom:true }
      }
    }
  })
  return product
}

export const cachedGetProducts = nextCache(
  getProduct, ["product-detail"],{
    tags: ["product-detail"]
  })

export async function getIsOwner(userId:number){
  const session = await getSession();
  if(session.id) return session.id === userId;
  return false;
}

"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getProduct(id:number) {
  const product = db.product.findUnique({
    where: { id: id },
    include: {
      user: { select : { username:true, avatar: true} }
    }
  })
  return product; 
}

export async function getIsOwner(userId:number){
  const session = await getSession();
  if(session.id) return session.id === userId;
  return false;
}

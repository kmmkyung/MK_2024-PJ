"use server"

import db from "@/lib/db"

export async function getAnotherUser(userId:number) {
  const anotherUser = await db.user.findUnique({
    where: {
      id: userId
    }
  })
  return anotherUser;
}
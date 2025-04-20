"use server"

import db from "@/lib/db"
import getSession from "@/lib/session";

export async function getChatRooms(){
  const session = await getSession();
  const chatRooms = await db.chatRoom.findMany({
    where: {
      users: {
        some: { id: session.id }
      }
    },
    select: {
      id: true,
      product: { select: { photo: true } },
      message: {
        take: 1,
        orderBy: { created_at: "desc" },
      },
      users:{
        select:{username:true, avatar:true}
      }
    }
  })  
  return chatRooms;  
}
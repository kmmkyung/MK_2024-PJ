"use server"

import db from "@/lib/db"
import getSession from "@/lib/session";

export async function getChatRooms(){
  // await new Promise((r) => setTimeout(r, 10000));

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
      _count: {
        select: {
          message: {
            where: {
              view: false,
              userId: { not: session.id }
            }
          }
        }
      },
      users:{
        where: { id: {not: session.id} },
        select:{username:true, avatar:true}
      }
    }
  })

  chatRooms.sort((a, b) => {
    const dateA = a.message[0] ? new Date(a.message[0].created_at).getTime() : 0;
    const dateB = b.message[0] ? new Date(b.message[0].created_at).getTime() : 0;
    return dateB - dateA;
  });

  return chatRooms;  
}
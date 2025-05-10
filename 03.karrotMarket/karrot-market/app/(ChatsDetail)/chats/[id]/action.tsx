"use server"

import db from "@/lib/db"
import getSession from "@/lib/session";
import { MessageType, Prisma } from "@prisma/client";

export async function getRoom(id:string){
  const room = await db.chatRoom.findUnique({
    where: { id },
    include: {
      product: { select: { photo: true, userId:true } },
      users: { select: { id: true } }
    }
  })
  if(room){
    const session = await getSession();
    const canSee = Boolean(room.users.find(user => user.id === session.id))
    if(!canSee){
      return null
    }
  }
  return room
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>

export async function getMessages(chatRoomId:string, userId:number){
  const messages = await db.message.findMany({
    where: { chatRoomId },
    select: { id:true, payload:true, created_at:true, userId:true, view:true, type:true,
              user: { select: { avatar:true, username:true } }
    },
  })

  await db.message.updateMany({
    where: {chatRoomId, userId:{not:userId} ,view: false},
    data: {view: true}
  });
  return messages
}

export async function saveMessage(payload:string, chatRoomId:string, type: MessageType){
  const session = await getSession();
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
      view: false,
      type
    },
    select: {id:true}
  })
}

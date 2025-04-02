"use server"

import db from "@/lib/db";
import getSession from "@/lib/session"
import { revalidatePath } from "next/cache";

export async function getPost(id:number) {
  try{
    const post = await db.post.update({
      where: { id: id },
      data:{ views: {increment: 1} },
      include : {
        user: { select: {username:true, avatar:true} },
        _count: { select: {comment:true, like:true} }
      },
    })
    return post;
  }
  catch(error){
    console.error(error)
    return null;
  }
}

export async function getIsLiked(postId:number){
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      id: { postId: postId, userId: session.id! }
    }
  })
  return Boolean(like)
}

export async function likePost(numberId:number){
  const session = await getSession();
  try{
    await db.like.create({
      data: { postId: numberId, userId: session.id! }
    });
    revalidatePath(`/post/${numberId}`)
  }
  catch(event){}
}

export async function dislikePost(numberId:number){
  const session = await getSession();
  await db.like.delete({
    where: {
      id: { postId: numberId, userId: session.id! }
    }
  })
  revalidatePath(`/post/${numberId}`)
}
  
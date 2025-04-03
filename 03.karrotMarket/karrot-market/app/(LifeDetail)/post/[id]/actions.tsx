"use server"

import db from "@/lib/db";
import getSession from "@/lib/session"
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

async function getPost(id:number) {
  try{
    const post = await db.post.update({
      where: { id: id },
      data:{ views: {increment: 1} },
      include : {
        user: { select: {username:true, avatar:true} },
        _count: { select: {comment:true} }
      },
    })
    return post;
  }
  catch(event){
    console.log(event)
    return null;
  }
}

export const cachedPost = nextCache(getPost,["post-detail"],{tags:["post-detail"]})

async function getLikeStatus(postId:number, userId:number){
  const isLiked = await db.like.findUnique({
    where: {
      id: { postId: postId, userId: userId }
    }
  });
  const likeCount = await db.like.count({
    where: {postId}
  });
  return {isLiked: Boolean(isLiked), likeCount}
}

export async function cachedLikeStatus(postId:number){
  const session = await getSession();
  const userId = session.id
  const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
  tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId!);
  }

export async function likePost(postId:number){
  const session = await getSession();
  try{
    await db.like.create({
      data: { postId: postId, userId: session.id! }
    });
    revalidateTag(`like-status-${postId}`)
  }
  catch(event){
    console.log(event)
    return null;
  }
}

export async function dislikePost(postId:number){
  const session = await getSession();
  await db.like.delete({
    where: {
      id: { postId: postId, userId: session.id! }
    }
  })
  revalidateTag(`like-status-${postId}`)
}
  
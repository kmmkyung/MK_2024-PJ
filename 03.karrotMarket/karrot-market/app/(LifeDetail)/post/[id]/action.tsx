"use server"

import db from "@/lib/db";
import getSession from "@/lib/session"
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { z } from "zod";

async function getPost(id:number) {
  try{
    const post = await db.post.update({
      where: { id: id },
      data:{ views: {increment: 1} },
      include : {
        comment: { select: {id:true, payload:true, userId:true, created_at:true}},
        user: { select: {username:true, avatar:true} },
        _count: { select: {comment:true} }
      },
    })
    return post;
  }
  catch(e){
  }
}

export const cachedPost = nextCache(getPost,["post-detail"],{tags:["post-detail"],revalidate: 30,
})

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
  // await new Promise((r) => setTimeout(r, 10000)); 
  const session = await getSession();
  try{
    await db.like.create({
      data: { postId: postId, userId: session.id! }
    });
    revalidateTag(`like-status-${postId}`)
  }
  catch(e){
  }
}

export async function dislikePost(postId:number){
  // await new Promise((r) => setTimeout(r, 10000));
  const session = await getSession();
  await db.like.delete({
    where: {
      id: { postId: postId, userId: session.id! }
    }
  })
  revalidateTag(`like-status-${postId}`)
}

// comment
const commentSchema = z.string().min(1,'1글자 이상 입력해주세요').max(200,'200자 이하 입력해주세요');

export async function addComment(formData: FormData, postId:number){
  const comment = formData.get("comment");
  const result = commentSchema.safeParse(comment);
  if(!result.success){
    return result.error.flatten();
  }
  else {
    const session = await getSession();
    if(session.id){
      await db.comment.create({
        data : {
          payload: result.data,
          created_at: new Date(),
          post: { connect: { id: postId } },
          user: { connect: { id: session.id } }
        },
        select: {
          id: true,
          payload: true,
          created_at: true,
          userId: true,
          user: { select: { username: true, avatar: true } }
        }
      })
    }
  }
}

export async function getComments(postId:number){
  const comments = await db.comment.findMany({
    where: {
      postId: postId
    },
    include: {
      user: { select: { username: true, avatar: true } }
    },
    orderBy: { created_at: "asc" }
  });
  return comments;
}
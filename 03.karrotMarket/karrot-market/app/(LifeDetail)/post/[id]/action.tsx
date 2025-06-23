"use server"

import db from "@/lib/db";
import getSession from "@/lib/session"
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getPostView(id: number) {
  try {
    const post = await db.post.findUnique({
      where: { id },
      include: {
        comment: {
          select: { id: true, payload: true, userId: true, created_at: true },
        },
        user: {
          select: { id: true, username: true, avatar: true },
        },
        _count: {
          select: { comment: true, like: true },
        },
      },
    });
    return post;
  } catch (e) {
    console.log(e);
  }
}

export async function getPost(id:number) {
  try{
    const post = await db.post.update({
      where: { id: id },
      data:{ views: {increment: 1} },
      include : {
        comment: { select: {id:true, payload:true, userId:true, created_at:true}},
        user: { select: {id:true, username:true, avatar:true} },
        _count: { select: {comment:true} }
      },
    })
    return post;
  }
  catch(e){
    console.log(e);
  }
}

export const cachedPost = nextCache(getPost,["post-detail"],
  {tags:["post-detail"],revalidate: 30}
)

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
    console.log(e);
    
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
const commentSchema = z.string().trim().min(1,'1글자 이상 입력해주세요').max(200,'200자 이하 입력해주세요');

export async function addComment(formData: FormData, postId:number){
  const comment = formData.get("comment");
  const result = commentSchema.safeParse(comment);
  if(!result.success){
    return {
      formErrors: result.error.flatten().formErrors,
      newComment: null
    };
  }
  else {
    const session = await getSession();
    if(session.id){
      const newComment = await db.comment.create({
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
      revalidateTag(`post-comment-${postId}`)
      return {newComment, formErrors:null};
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

export async function cachedGetComments(postId:number){
  const cachedComments = nextCache(getComments, [`post-comment-${postId}`],{tags:[`post-comment-${postId}`]});
  return cachedComments(postId)
}

export async function deletePost(postId:number){
  await db.post.delete({
    where: {id:postId},
  })
  revalidateTag('post-detail');
  redirect(`/life`);
}

export async function deleteComment(commentId:number, postId:number){
  await db.comment.delete({
    where: {id:commentId},
  })
  revalidateTag(`post-comment-${postId}`)
  revalidateTag('post-detail')
}
"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logOut(){
  const session = await getSession();
  await session.destroy();
  redirect('/')
}

export async function getUserProducts(userId:number){
  const userProducts = db.product.findMany({
    where: {
      userId: userId
    },
    orderBy: { updated_at: "desc"}
  })
  return userProducts;
}

export async function getUserBuyProducts(userId:number){
  const userBuyProducts = db.product.findMany({
    where: {
      dealt: true,
      userId: {not: userId},
      chatRoom: {
        some: {
          users: { some: { id: userId }}
        }
      }
    },
    orderBy: { updated_at: "desc"}
  })
  return userBuyProducts;
}

export async function getUserPosts(userId:number){
  const userPost = db.post.findMany({
    where: {
      userId: userId
    },
    orderBy: { updated_at: "desc"}
  })
  return userPost;
}

export async function getUserReviews(userId:number){
  const userReview = db.review.findMany({
    where: {
      userId: userId
    },
    include: {
      author: true,
    },
    orderBy: { updated_at: "desc"}
  })
  return userReview;
}

export async function getUserSendReviews(userId:number){
  const userSendReview = db.review.findMany({
    where: {
      targetId: userId,
    },
    include: {
      author: true, // 리뷰 작성자 정보
    },
    orderBy: { updated_at: "desc"}
  })
  return userSendReview;
}
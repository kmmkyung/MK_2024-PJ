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
    }
  })
  return userProducts;
}

export async function getUserBuyProducts(userId:number){
  const userBuyProducts = db.product.findMany({
    where: {
      chatRoom: {
        some: {
          users: { some: { id: userId } }
        }
      },
      dealt: true
    }
  })
  return userBuyProducts;
}

export async function getUserPosts(userId:number){
  const userPost = db.post.findMany({
    where: {
      userId: userId
    }
  })
  return userPost;
}

export async function getUserReviews(userId:number){
  const userReview = db.review.findMany({
    where: {
      userId: userId
    }
  })
  return userReview;
}
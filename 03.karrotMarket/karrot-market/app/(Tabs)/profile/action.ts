"use server"

import db from "@/lib/db";
import getSession from "@/lib/session";
import { CategoryType } from "@prisma/client";
import { redirect } from "next/navigation";

export interface IUserProfile {
  id: number;
  username: string;
  email: string | null;
  password: string | null;
  phone: string | null;
  github_id: string | null;
  google_id: string | null;
  kakao_id: string | null;
  avatar: string | null;
  updated_at: Date;
}

export interface IUserProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
  userId: number;
  category: CategoryType;
  dealt: boolean;
}

export interface IUserPosts {
  id: number;
  title: string;
  description: string;
  views: number;
  created_at: Date;
  updated_at: Date;
  userId: number;
  _count:{
    comment: number;
    like: number;
  }
}

export interface IUserReviews {
  id: number;
  created_at: Date;
  updated_at: Date;
  payload: string;
  userId: number;
  targetId: number;
  authorId: number;
  productId: number;
  chatRoomId: string;
  author: IUserProfile;
}

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
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      user: true,
      _count: {
        select: {
          comment: true,
          like: true
        }
      }
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
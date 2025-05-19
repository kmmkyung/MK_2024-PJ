import { getUser } from "@/lib/getUser";
import { headers } from "next/headers";
import ProfileMobile from "@/components/ProfileMobile";
import ProfileDesktop from "@/components/ProfileDesktop";
import { getUserBuyProducts, getUserPosts, getUserProducts, getUserReviews } from "./action";
import { CategoryType } from "@prisma/client";
import UserProvider from "@/components/UserProvider";

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
}

export interface IUserReviews {
  id: number;
  created_at: Date;
  updated_at: Date;
  payload: string;
  userId: number;
  productId: number;
  chatRoomId: string;
}

export default async function layout({children}: Readonly<{children: React.ReactNode;}>) {
  const header = await headers();
  const userAgent = header.get('user-agent')||'';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);

  const user = await getUser();
  const [userProducts, userBuyProducts, userPosts, userReviews] = await Promise.all([
    getUserProducts(user.id),
    getUserBuyProducts(user.id),
    getUserPosts(user.id),
    getUserReviews(user.id),
  ]);

  const providerValue = { user, userProducts, userBuyProducts, userPosts, userReviews };


  return isMobile
    ? <UserProvider value={providerValue}>
        <ProfileMobile>{children}</ProfileMobile>
      </UserProvider>
    : <UserProvider value={providerValue}>
        <ProfileDesktop>{children}</ProfileDesktop>
      </UserProvider>
}

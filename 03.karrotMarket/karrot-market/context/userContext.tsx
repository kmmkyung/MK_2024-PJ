"use client";

import { IUserPosts, IUserProducts, IUserProfile, IUserReviews } from "@/app/(Tabs)/profile/layout";
import { createContext, useContext } from "react";

export interface userContextType {
  user: IUserProfile;
  userProducts: IUserProducts[]|[];
  userBuyProducts: IUserProducts[]|[];
  userPosts: IUserPosts[]|[];
  userReviews: IUserReviews[]|[];
  userSendReview: IUserReviews[]|[];
}

export const UserContext = createContext<userContextType>(
  {} as userContextType
)

export function useUserContext(){
  return useContext(UserContext);
}
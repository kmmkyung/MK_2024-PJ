import { getUser } from "@/lib/getUser";
import ProfileMenu from "@/components/ProfileMenu";
import { getUserBuyProducts, getUserPosts, getUserProducts, getUserReviews, getUserSendReviews } from "./action";
import UserProvider from "@/components/UserProvider";

export default async function layout({children}: Readonly<{children: React.ReactNode;}>) {
  const user = await getUser();
  const [userProducts, userBuyProducts, userPosts, userReviews, userSendReview] = await Promise.all([
    getUserProducts(user.id),
    getUserBuyProducts(user.id),
    getUserPosts(user.id),
    getUserReviews(user.id),
    getUserSendReviews(user.id),
  ]);

  const providerValue = { user, userProducts, userBuyProducts, userPosts, userReviews, userSendReview };

  return  <UserProvider value={providerValue}>
        <ProfileMenu>{children}</ProfileMenu>
      </UserProvider>
}

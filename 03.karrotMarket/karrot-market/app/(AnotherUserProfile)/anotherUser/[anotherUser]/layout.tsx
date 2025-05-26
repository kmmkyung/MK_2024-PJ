import NavLinkPageGo from "@/components/NavLinkPageGo";
import { getAnotherUser } from "./action";
import ProfileMenu from "@/components/ProfileMenu";
import { getUserPosts, getUserProducts, getUserSendReviews } from "@/app/(Tabs)/profile/action";
import UserProvider from "@/components/UserProvider";

export default async function layout({params, children}: {params:{anotherUser: number}, children: React.ReactNode}) {
  const { anotherUser } = await params;
  const anotherUserId = Number(anotherUser);

  const [userAnother, userProducts, userPosts, userSendReview] = await Promise.all([
    getAnotherUser(anotherUserId),
    getUserProducts(anotherUserId),
    getUserPosts(anotherUserId),
    getUserSendReviews(anotherUserId),
  ]);

  const providerValue = { userAnother, userProducts, userPosts, userSendReview };
  
  return (
    <>
      <NavLinkPageGo/>
      <UserProvider value={providerValue}>
        <ProfileMenu>{children}</ProfileMenu>
      </UserProvider>
    </>
  );
}

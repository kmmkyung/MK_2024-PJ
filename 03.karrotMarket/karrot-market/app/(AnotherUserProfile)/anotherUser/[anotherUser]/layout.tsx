import NavLinkPageGo from "@/components/NavLinkPageGo";
import { getAnotherUser } from "./action";
import ProfileMenu from "@/components/ProfileMenu";
import { getUserPosts, getUserProducts, getUserReviews, getUserSendReviews } from "@/app/(Tabs)/profile/action";
import UserProvider from "@/components/UserProvider";
import TabBar from "@/components/TabBar";
interface LayoutProps {
  params: Promise<{
  anotherUser: string;
}>;
  children: React.ReactNode;
}

export default async function layout({params, children}: LayoutProps) {
  const { anotherUser } = await params;
  const anotherUserId = Number(anotherUser);

  const [userAnother, userProducts, userPosts, userReviews] = await Promise.all([
    getAnotherUser(anotherUserId),
    getUserProducts(anotherUserId),
    getUserPosts(anotherUserId),
    getUserReviews(anotherUserId),
  ]);

  const providerValue = { userAnother, userProducts, userPosts, userReviews, anotherUserId };
  
  return (
    <>
      <NavLinkPageGo/>
      <UserProvider value={providerValue}>
        <ProfileMenu>{children}</ProfileMenu>
      </UserProvider>
      <TabBar className="block md:hidden"/>
    </>
  );
}

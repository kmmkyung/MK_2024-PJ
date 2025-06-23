import ProfileDashboard from "@/components/ProfileDashboard";
import { getAnotherUser } from "./action";

export async function generateMetadata({params}:{ params: Promise<{anotherUser:string}>}){
  const {anotherUser} = await params
  const anotherUserInfo = await getAnotherUser(Number(anotherUser));
  return {
    title: `${anotherUserInfo?.username}님과의 프로필`
  }
}

export default async function AnotherUser() {

  return (
    <section className="p-10">
      <ProfileDashboard/>  
    </section>
  )
}
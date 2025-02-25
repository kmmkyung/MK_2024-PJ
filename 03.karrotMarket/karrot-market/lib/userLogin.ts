import { redirect } from "next/navigation";
import getSession from "./session"

export default async function userLogin(userID:number){
  const session = await getSession()
  session.id = userID
  await session.save()
  return redirect('/profile')
}
import { redirect } from "next/navigation";
import getSession from "./session"

export default async function userLogin(userId: number, uid: string) {
  const session = await getSession();
  session.id = userId;
  session.uid = uid;
  await session.save();
  return redirect('/profile');
}
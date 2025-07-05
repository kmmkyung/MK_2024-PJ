import { redirect } from "next/navigation";
import getSession from "./session"

export default async function userLogin(id:number, uid: string) {
  const session = await getSession();
  session.id = id;
  session.uid = uid;
  await session.save();
  return redirect('/profile');
}
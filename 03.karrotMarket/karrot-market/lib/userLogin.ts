import { redirect } from "next/navigation";
import getSession from "./session"
import { revalidatePath } from "next/cache";

export default async function userLogin(id:number) {
  const session = await getSession();
  session.id = id;
  await session.save();
  await revalidatePath('/')
  return redirect('/profile');
}
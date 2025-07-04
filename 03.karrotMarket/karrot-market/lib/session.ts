import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface ISession {
  id?: number
  uid?: string
}
export default async function getSession(){
  return getIronSession<ISession>( await cookies(), {
    cookieName: "Carrot",
    password: process.env.COOKIE_PASSWORD!
  })
}
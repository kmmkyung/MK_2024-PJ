import { getUser } from "@/lib/getUser";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";


export default async function Profile(){
  const user = await getUser();

  async function logOut(){
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/')
  }

  return (
    <section className="setting-page">
      <h1>welcome {user?.username}</h1>
      <form action={logOut}>
        <button>Logout</button>
      </form>
    </section>
  )
}
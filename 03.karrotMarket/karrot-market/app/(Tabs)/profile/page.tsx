import db from "@/lib/db";

import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
async function getUser(){
  const session = await getSession();
  if(session.id){
    const user = await db.user.findUnique({
      where:{ id: session.id }
    })
    if(user){
      return user;
    }
  }
  notFound()
}

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
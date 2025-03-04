import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProduct(id:number){
  const product= await db.product.findUnique({
    where: { id: id },
    include: {
      user: {
        select: { username:true, avatar:true }
      }
    }
  })
  return product
}

async function getIsOwner(userId:number){
  const session = await getSession();
  if(session.id) return session.id === userId;
  return false;
}


export default async function ProductDetail({params}:{ params: {id:string}}){
  const {id} = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();

  const product = await getProduct(numberId);
  if(!product) return notFound();

  const isOwner = await getIsOwner(product.userId);

  async function deleteUserProduct(){
    'use server'
    await db.product.delete({
      where: {id:numberId}
    })
    redirect('/products')
  }

  return (
    <section className="setting-page flex flex-col gap-5 md:flex-row relative h-screen">
      <div className="md:w-1/2">
        <div className="relative aspect-square">
          <Image className="object-cover object-center rounded-lg" fill src={product.photo} alt={product.title}/>
        </div>
        <div className="flex items-center gap-2 my-5">
          <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
            {product.user.avatar !== null ? <Image width={40} height={40} src={product.user.avatar} alt={product.user.username}/> :
              <Image width={40} height={40} src="/image/rabbit.png" alt="default avatar"/>}
          </div>
          <h3 className="default-textSize">{product.user.username}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:w-1/2">
        <h1 className="default-textSize">{product.title}</h1>
        <p className="text-sm">{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 py-5 bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
        <div className="md:max-w-screen-xl mx-auto px-10 flex items-center justify-between">
          <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
          {isOwner ?
          <form action={deleteUserProduct}>
            <button className="custom-link bg-red-600 hover:bg-red-500 text-neutral-200 w-auto px-5">
              삭제하기
            </button>
          </form>
        : <Link className="primary-link w-auto px-5" href="/chats">채팅하기</Link>}
        </div>
      </div>
    </section> 
  )
}
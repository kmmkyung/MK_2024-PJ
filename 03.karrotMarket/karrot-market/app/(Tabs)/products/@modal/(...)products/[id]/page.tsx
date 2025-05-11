import ModalCloseBg from "@/components/ModalCloseBg";
import ModalCloseButton from "@/components/ModalCloseButton";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { JSX } from "react";
import ProductOwnerButton from "@/components/ProductOwnerButton";
import { getIsOwner, getProduct } from "./action";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { revalidateTag } from "next/cache";



export default async function ModalPage({params}:{ params: Promise<{id:string}>}): Promise<JSX.Element>{
  
  const {id} = await params;
  const numberId = Number(id);
  if(isNaN(numberId)) return notFound();

  const product = await getProduct(numberId);
  if(!product) return notFound();

  const isOwner = await getIsOwner(product.userId);

  async function createChatRoom(){
    "use server"
    const session = await getSession();
    const isRoom = await db.chatRoom.findFirst({
      where: {
        productId: numberId,
        users : {
          some: {id:session.id}
        }
      }
    })
    if(isRoom){
      redirect(`/chats/${isRoom.id}`)
    }
    else{
      const room = await db.chatRoom.create({
        data: {
          productId: numberId,
          users : {
            connect: [{id:product?.userId},{id:session.id}]
          }
        },
        select: {id:true}
      });
      revalidateTag(`products`)
      revalidateTag('product-detail')
      redirect(`/chats/${room.id}`)
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-[51] w-full h-full px-10 py-20 flex justify-center items-center">
        <ModalCloseBg/>
        <ModalCloseButton/>
        <div className="relative rounded-lg overflow-hidden max-w-[1000px] w-full h-full no-scrollbar overflow-y-scroll md:overflow-y-visible flex md:flex-row flex-col">
          <div className="relative w-full h-full aspect-square md:aspect-auto basis-1/2">
            <Image className="object-cover object-center" fill priority sizes="600px 600px" src={product.photo} alt={product.title}/>
          </div>
          <div className="basis-1/2 w-full h-full md:w-1/2">
            <div className="bg-white dark:bg-neutral-900 h-[calc(100vh-160px)] w-full md:h-full p-5 flex flex-col justify-between gap-5">
              <div className="h-[calc(100%-76px)]">
                <div>
                  <div className="flex items-center gap-2 pb-5 border-neutral-300 dark:border-neutral-700 border-b">
                    <div className="size-8 rounded-full overflow-hidden flex items-center justify-center">
                      <Image width={40} height={40} src={product.user.avatar!} alt={product.user.username}/>
                    </div>
                    <h3 className="text-sm">{product.user.username}</h3>
                  </div>
                  <h1 className="text-lg md:text-2xl font-semibold mt-5 break-words overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</h1>
                  <p className="mt-2 text-xs text-neutral-400">{product.category}<span className="mx-2">•</span>{formatToTimeAgo(product.created_at.toString())}</p>
                  <p className="text-base md:text-xl font-semibold mt-5 ">{formatToWon(product.price)}원</p>
                </div>
                <div className="mt-5 h-[calc(100%-196px)] overflow-y-scroll no-scrollbar">
                  <p className="text-sm pb-2">{product.description}</p>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-neutral-500">
                  <ChatBubbleOvalLeftEllipsisIcon className="size-3"/>
                  {product._count.chatRoom}
                </p>
                <div className="mt-5">
                {isOwner ?
                <ProductOwnerButton numberId={numberId}/>
                : <form action={createChatRoom}><button disabled={product.dealt} className="primary-btn w-full px-5">채팅하기</button></form>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

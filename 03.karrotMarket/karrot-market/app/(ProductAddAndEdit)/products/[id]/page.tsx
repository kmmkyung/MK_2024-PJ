import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import { cachedGetProducts, getIsOwner } from "../../action";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import ProductOwnerButton from "@/components/ProductOwnerButton";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { getProduct } from "@/app/(Tabs)/products/@modal/(...)products/[id]/action";

export async function generateMetadata({params}:{ params: Promise<{id:string}>}){
  const {id} = await params
  const product = await getProduct(Number(id));
  return {
    title: product?.title
  }
}

export default async function ProductDetail({params}:{ params: Promise<{id:string}>}){
  const {id} = await params
  const numberId = Number(id)
  if(isNaN(numberId)) return notFound();
  
  const product = await cachedGetProducts(numberId);
  
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
      redirect(`/chats/${room.id}`)
    }
  }
  
  return (
    <section className="setting-page pt-20 flex align-top flex-col md:gap-5 md:flex-row relative">
      <div className="md:w-1/2">
        <div className="relative aspect-square">
          <Image className="object-cover object-center rounded-lg" fill priority sizes="600px 600px" src={product.photo} alt={product.title}/>
        </div>
        <div className="flex items-center gap-2 my-5">
          <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
            <Image width={40} height={40} sizes="40px" src={product.user.avatar!} alt={product.user.username}/>
          </div>
          <h3 className="text-sm">{product.user.username}</h3>
        </div>
      </div>
      <div className="aspect-auto pt-5 pb-[140] md:mb-[80] md:pt-0 md:aspect-square md:pb-0 md:justify-between flex flex-col md:w-1/2 border-neutral-300 dark:border-neutral-700 border-t md:border-none">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="mt-2 text-xs text-neutral-400">{product.category}<span className="mx-2">•</span>{formatToTimeAgo(product.created_at.toString())}</p>
          <p className="font-semibold text-xl mt-5 md:block hidden">{formatToWon(product.price)}원</p>
          <p className="text-sm mt-5">{product.description}</p>
        </div>
        <div className="md:block hidden mt-10">
        {isOwner ?
            <ProductOwnerButton numberId={numberId}/>
        : <form action={createChatRoom}><button className="primary-link w-full px-5">채팅하기</button></form>}
        </div>
      </div>

      {/* mobile */}
      <div className="box-border md:hidden block fixed w-full bottom-0 left-0 h-[80] bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
        <div className="md:max-w-screen-xl mx-auto px-10 h-full flex items-center justify-between">
          <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
          {isOwner ?
            <ProductOwnerButton numberId={numberId}/>
        : <form action={createChatRoom}>
            <button className="primary-link w-auto px-4 flex justify-center items-center">
              <ChatBubbleOvalLeftEllipsisIcon className="size-5 text-white"/>
            </button>
          </form>}
        </div>
      </div>
    </section> 
  )
}

// export const dynamicParams = true;
// export async function generateStaticParams(){
//   const products = await db.product.findMany({
//     select: {id: true}
//   })
//   return products.map(ele => ({id: ele.id+""}))
// }
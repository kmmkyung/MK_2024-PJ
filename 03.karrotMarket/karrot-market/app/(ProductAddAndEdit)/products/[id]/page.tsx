import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import { cachedGetProducts, getIsOwner } from "../../action";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ChatBubbleOvalLeftEllipsisIcon as SolidChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon as OutlineChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/24/outline";
import ProductOwnerButton from "@/components/ProductOwnerButton";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { getProduct } from "@/app/(Tabs)/products/@modal/(...)products/[id]/action";
import { revalidateTag } from "next/cache";
import AnotherUsername from "@/components/AnotherUsername";

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
  
  const product = 
  // await new Promise((r) => setTimeout(r, 10000));
  await cachedGetProducts(numberId);
  
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
      revalidateTag('products')
      revalidateTag('product-detail')
      redirect(`/chats/${room.id}`)
    }
  }
  
  return (
    <section className="md:h-screen setting-page">
      <div className="h-full py-5 flex flex-col items-center md:gap-5 md:flex-row relative">
        <div className="w-full md:w-1/2 md:max-h-[640]">
          <div className="relative aspect-square">
            <Image className="object-cover object-center rounded-lg" fill priority sizes="600px 600px" src={product.photo} alt={product.title}/>
          </div>
          <div className="flex items-center gap-2 md:mb-0 mb-5 mt-5">
          {isOwner ?
            <div className="flex items-center gap-2">
              <Image className="size-8 rounded-full overflow-hidden " width={40} height={40} src={product.user.avatar!} alt={product.user.username}/>
              <h3 className="text-sm default-textColor">{product.user.username}</h3>
            </div>
          : <AnotherUsername userInfo={product.user} page="product"/>
          }
          </div>
        </div>
        <div className="w-full md:max-h-[640] aspect-auto pt-5 md:mb-0 md:pt-0 md:aspect-square md:pb-0 md:justify-between flex flex-col md:w-1/2 border-neutral-300 dark:border-neutral-700 border-t md:border-none">
          <div className="h-full flex flex-col justify-between gap-5 md:gap-0">
            <div className="md:h-[calc(100%-16px)]">
              <h1 className="text-lg md:text-2xl font-semibold">{product.title}</h1>
              <p className="mt-2 text-xs text-neutral-500">{product.category}<span className="mx-2">•</span>{formatToTimeAgo(product.created_at.toString())}</p>
              <p className="text-lg md:text-xl font-semibold mt-5 md:block hidden">{formatToWon(product.price)}원</p>
              <p className="md:h-[calc(100%-140px)] overflow-y-scroll text-sm mt-5">{product.description}</p>
            </div>
            <p className="flex items-center gap-1 text-xs text-neutral-500">
              <OutlineChatBubbleOvalLeftEllipsisIcon className="size-3"/>채팅 {product._count.chatRoom}
            </p>
          </div>
          <div className="md:block hidden mt-3">
          {isOwner ?
            <ProductOwnerButton numberId={numberId}/>
          : <form action={createChatRoom}><button disabled={product.dealt} className="primary-btn w-full px-5">채팅하기</button></form>}
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden block fixed w-full bottom-0 left-0 h-[70] bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 border-t">
          <div className="md:max-w-screen-xl mx-auto px-10 h-full flex items-center justify-between">
            <span className="font-semibold text-xl">{formatToWon(product.price)}원</span>
            {isOwner ?
              <ProductOwnerButton numberId={numberId}/>
          : <form action={createChatRoom}>
              <button disabled={product.dealt} className="primary-btn w-auto px-4 flex justify-center items-center">
                <SolidChatBubbleOvalLeftEllipsisIcon className="size-5 text-white"/>
              </button>
            </form>}
          </div>
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
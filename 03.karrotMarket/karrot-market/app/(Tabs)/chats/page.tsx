import Image from "next/image";
import { getChatRooms } from "./action"
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";

export const metadata = {
  title:"Chats"
}

export default async function Chats(){
  const chatRooms = await getChatRooms()
    
  if(chatRooms.length === 0){
    return <section className="setting-page h-screen">
      <div className="h-full flex items-center justify-center">
        <p className="text-sm">대화방이 없습니다.</p>
      </div>
    </section>
  }

  return (
    <section className="setting-page">
      <div className="flex flex-col gap-7 my-5">
        {chatRooms.map((ele,idx)=>{
          return (
            <Link href={`/chats/${ele.id}`} key={idx} className="py-2 flex items-center justify-between">
              <div className="flex items-center w-full">
                <div className="flex items-start gap-2 relative">
                  <div className="flex items-center">
                    <div className="relative size-14 rounded-lg overflow-hidden aspect-square">
                      <Image src={ele.product.photo} alt="product" fill priority sizes="40px" className="object-cover object-center"/>
                    </div>
                    <div className="relative bg-white dark:bg-neutral-900 -ml-3 size-8 rounded-full overflow-hidden outline-2 outline outline-white dark:outline-neutral-900">
                      <Image src={ele.users[0].avatar!} alt="user" width={40} height={40} sizes="40px"/>
                    </div>
                  </div>
                  <div className="absolute left-[88px] w-max">
                  { ele.message[0] ? 
                    <p className="text-xs default-textColor">
                      {ele.users[0].username}
                      <span className="mx-1">•</span>
                      <span className="text-neutral-500">{formatToTimeAgo(ele.message[0]?.created_at.toString())}</span>
                    </p>
                    : <p className="text-xs default-textColor">{ele.users[0].username}</p>
                  }
                  </div>
                </div>
                <div className="ml-3 w-[calc(100%-117px)]">
                  {ele.message[0] ? <p className="text-sm w-full text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">{ele.message[0].payload}</p>
                  : <p className="text-sm w-full text-neutral-500 overflow-hidden text-ellipsis whitespace-nowrap">🥕대화를 시작해보세요🥕</p>}
                </div>
              </div>
              {
                ele._count.message ?
                  <div className="flex-shrink-0 size-6 text-center leading-6 rounded-full bg-primary text-[10px] text-white">
                    {ele._count.message > 99 ? "99+" : ele._count.message}
                  </div>
                : null
              }
            </Link>
          )
        })}
      </div>
    </section>
  )
}
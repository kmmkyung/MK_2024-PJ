import Image from "next/image";
import { getChatRooms } from "./action"
import Link from "next/link";
import { formatToTimeAgo } from "@/lib/utils";

export const metadata = {
  title:"Chats"
}

export default async function Chats(){
  const chatRooms = await getChatRooms()
  console.log(chatRooms[0].message[0].payload);
  
  return (
    <section className="setting-page">
      <div className="flex flex-col gap-5">
        {chatRooms.map((ele,idx)=>{
          return (
            <Link href={`/chats/${ele.id}`} key={idx} className="outline-2 outline outline-cyan-400 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative size-14 rounded-lg overflow-hidden aspect-square ">
                  <Image src={ele.product.photo} alt="product" fill priority sizes="40px" className="object-cover object-center"/>
                </div>
                <div className="relative -ml-1 size-10 rounded-full overflow-hidden outline-2 outline outline-white dark:outline-neutral-900">
                  <Image src={ele.users[1].avatar!} alt="user" width={40} height={40} sizes="40px"/>
                </div>
              </div>
              <div>
              { ele.message[0] ? 
                <p className="mt-2 text-xs text-neutral-400">
                  {ele.users[1].username}
                    <span className="mx-2">•</span>{formatToTimeAgo(ele.message[0]?.created_at.toString())}
                </p>
                : <p className="mt-2 text-xs text-neutral-400">{ele.users[1].username}</p>
              }
              </div>
              <div>
                {ele.message[0] ? <p>{ele.message[0].payload}</p> : null}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
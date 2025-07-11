"use client"

import { formatToTimeAgo } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface IProduct {
    id: number
    username: string
    avatar: string | null
}

export default function AnotherUsername({userInfo, page, post}:{userInfo:IProduct, page:string, post?:Date}){
  const pathname = usePathname();
  function handleClick(){
    sessionStorage.setItem('userProfileFrom', pathname);
  }


  return (
    <Link href={`/anotherUser/${userInfo.id}`} onClick={handleClick} className="flex items-center gap-2">
      <Image className={`${page==="product" || page ==="chat"? "size-8" : "size-10"} rounded-full overflow-hidden flex items-center justify-center`} width={40} height={40} src={userInfo.avatar!} alt={userInfo.username}/>
      <div>
        {page !== "chat" && <h3 className="text-sm default-textColor">{userInfo.username}</h3>}
        { page==="post" && post && <span className="text-xs text-neutral-500">{formatToTimeAgo(post.toString())}</span>}
      </div>
    </Link>
  )
}
"use client"

import { formatToTimeAgo } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface IProduct {
    id: number
    username: string
    avatar: string | null
}

export default function AnotherUsername({userInfo, page, post}:{userInfo:IProduct, page:string, post?:Date}){
  return (
    <Link href={`/profile/${userInfo.id}`} onClick={() => sessionStorage.setItem('cameFromAnotherUserProfile', 'true')} className="flex items-center gap-2">
      <div className={`${page==="product"? "size-8" : "size-10"} rounded-full overflow-hidden flex items-center justify-center`}>
        <Image width={40} height={40} src={userInfo.avatar!} alt={userInfo.username}/>
      </div>
      <div>
        <h3 className="text-sm default-textColor">{userInfo.username}</h3>
        { page==="life"&&post && <span className="text-xs text-neutral-500">{formatToTimeAgo(post.toString())}</span>}
      </div>
    </Link>
  )
}
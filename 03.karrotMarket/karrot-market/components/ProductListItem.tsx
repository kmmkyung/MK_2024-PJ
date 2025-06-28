import { formatToTimeAgo, formatToWon } from "@/lib/utils"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline"
import { CategoryType } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface IListProduct{
  title: string;
  price: number;
  created_at: Date;  
  photo: string;
  id: number;
  category:CategoryType;
  dealt: boolean;
  _count: {
    chatRoom: number;
  };
}

export default function ProductListItem({title, price, created_at, photo, id, category, dealt, _count}:IListProduct) {
  const searchParams = useSearchParams();
  const searchCategory = searchParams?.get("category");

  return (
    <Link className={`flex gap-5 w-full transition-opacity ${dealt ? "opacity-50" : ""}`}
    href={searchCategory===null?`/products/${id}`:`/products/${id}?category=${category}`} scroll={false}>
      <div className="relative rounded-md overflow-hidden size-28 bg-neutral-100">
        <Image src={photo} alt={title} priority sizes="600px" fill className="object-cover object-center"/>
      </div>
      <div className="w-[calc(100%-132px)] flex flex-col justify-between">
        <div>
          <h6 className="text-base default-textColor overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-1">
            {dealt && <span className="px-1 py-[2px] rounded-md text-xs bg-neutral-800 text-white block">거레완료</span>}
            {title}</h6>
          <p className="text-xs text-neutral-500 mt-1">{formatToTimeAgo(created_at.toString())}</p>
          <p className="text-sm font-semibold default-textColor mt-2">{formatToWon(price)}원</p>
        </div>
        <p className="flex items-center gap-1 text-xs text-neutral-500">
          <ChatBubbleOvalLeftEllipsisIcon className="size-3"/>
          {_count.chatRoom}
        </p>
      </div>
    </Link>
  )
}
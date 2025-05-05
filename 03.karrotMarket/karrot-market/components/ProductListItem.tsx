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
  
  console.log(dealt,'dealtdealt');
  console.log(_count?.chatRoom,'dsaf');


  return (
    <Link className="flex gap-5 w-full" href={searchCategory===null?`/products/${id}`:`/products/${id}?category=${category}`} scroll={false}>
      <div className="relative rounded-md overflow-hidden size-28 bg-neutral-100">
        <Image src={photo} alt={title} priority sizes="600px" fill className="object-cover object-center"/>
      </div>
      <div className="w-[calc(100%-132px)]">
        <div className="">
          <h6 className="text-base md:text-lg default-textColor overflow-hidden text-ellipsis whitespace-nowrap">{title}</h6>
          <p className="text-xs md:text-sm text-neutral-500 mt-1">{formatToTimeAgo(created_at.toString())}</p>
          <p className="text-sm md:text-lg font-semibold default-textColor mt-2">{formatToWon(price)}원</p>
        </div>
        <p className="flex items-center gap-1 text-xs text-neutral-500">
          <ChatBubbleOvalLeftEllipsisIcon className="size-3"/>
          {_count?.chatRoom == undefined? 0 : _count.chatRoom}
        </p>
      </div>
    </Link>
  )
}
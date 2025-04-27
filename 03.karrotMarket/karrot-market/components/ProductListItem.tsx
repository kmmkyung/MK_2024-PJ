import { formatToTimeAgo, formatToWon } from "@/lib/utils"
import { CategoryType } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface IListProduct{
  title: string,
  price: number,
  created_at: Date,  
  photo: string,
  id: number,
  category:CategoryType
}

export default function ProductListItem({title, price, created_at, photo, id, category}:IListProduct) {
  const searchParams = useSearchParams();  
  const searchCategory = searchParams?.get("category");  

  return (
    <Link className="flex gap-5 w-full" href={searchCategory===null?`/products/${id}`:`/products/${id}?category=${category}`} scroll={false}>
      <div className="relative rounded-md overflow-hidden size-28 bg-neutral-100">
        <Image src={photo} alt={title} priority sizes="600px" fill className="object-cover object-center"/>
      </div>
      <div className="flex flex-col w-[calc(100%-132px)]">
        <h6 className="text-base md:text-lg default-textColor overflow-hidden text-ellipsis whitespace-nowrap">{title}</h6>
        <p className="text-xs md:text-sm text-neutral-500 mt-1">{formatToTimeAgo(created_at.toString())}</p>
        <p className="text-sm md:text-lg font-semibold default-textColor mt-2">{formatToWon(price)}원</p>
      </div>
    </Link>
  )
}
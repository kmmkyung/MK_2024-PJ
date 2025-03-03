import { formatToTimeAgo, formatToWon } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface IListProduct{
  title: string,
  price: number,
  created_at: Date,  
  photo: string,
  id: number,
}

export default function ListProduct({title, price, created_at, photo, id}:IListProduct) {
  return (
    <Link className="flex gap-5" href={`products/${id}`}>
      <div className="relative rounded-md overflow-hidden size-28 bg-neutral-100">
        <Image src={photo} alt={title} fill className="object-cover"/>
      </div>
      <div className="flex flex-col">
        <h6 className="text-lg default-textColor">{title}</h6>
        <p className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</p>
        <p className="text-lg font-semibold default-textColor mt-2">{formatToWon(price)}원</p>
      </div>
    </Link>
  )
}
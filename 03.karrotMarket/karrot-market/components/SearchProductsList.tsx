"use client"

import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IProducts {
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    photo: string;
    created_at: Date;
    updated_at: Date;
    userId: number;
    category: $Enums.CategoryType;
  }[]
}

export default function SearchProductsList({products}:IProducts){
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 5);

  if(products.length == 0 ){
    return <p className="w-full h-full leading-[10] text-center text-sm">찾는 중고거래 글이 없습니다</p>
  }

  return (
    <div className="mt-5">
      <ol className="flex flex-col gap-5">
        {visibleProducts.map((product) => (
          <li key={product.id}>
            <Link className="flex gap-5 w-full" href={`/products/${product.id}`}>
              <div className="relative rounded-md overflow-hidden size-28 bg-neutral-100">
                <Image src={product.photo} alt={product.title} priority sizes="600px" fill className="object-cover object-center"/>
              </div>
              <div className="flex flex-col w-[calc(100%-132px)]">
                <h6 className="text-base md:text-lg default-textColor overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</h6>
                <p className="text-xs md:text-sm text-neutral-500 mt-1">{product.category} • {formatToTimeAgo(product.created_at.toString())}</p>
                <p className="text-sm md:text-lg font-semibold default-textColor mt-2">{formatToWon(product.price)}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      { !showAll && products.length > 5 && (
        <button onClick={() => setShowAll(true)} className="primary-btn text-sm mt-5">중고거래 더보기</button>
      )}
    </div>
  )
}

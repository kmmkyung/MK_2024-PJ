'use client'

import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import NavProfile from "./NavProfile";
import { useEffect, useState } from "react";
import PageNation from "./PageNation";

export default function ProfileBuy() {
  const { userBuyProducts } = useUserContext();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const sellOKProducts = userBuyProducts?.filter((product) => product.dealt === true) || [];
  const paginatedBuyProducts = sellOKProducts?.slice((page - 1) * limit, page * limit);

  useEffect(()=>{
    handleResize();
    window.addEventListener('resize', handleResize);
    return ()=>{
      window.removeEventListener('resize', handleResize);
    }
  },[])

  function handleResize() {
    if(innerWidth >= 640) {
      setLimit(8);
    }
    else{
      setLimit(5)
    }
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">구매내역</h6>
        <NavProfile/>
      </div>
      <div className="flex flex-col justify-between h-[calc(100%-44px)]">
        { userBuyProducts?.filter((product) => product.dealt === true ).length === 0 ? (
          <div className="flex justify-center items-center h-[calc(100%-74px)]">
          <p className="text-neutral-500 text-sm">판매 완료인 상품이 없습니다.</p>
          </div>
          ) : (
            <ol className="grid sm:grid-rows-2 grid-rows-5 grid-cols-1 sm:grid-cols-4 gap-5">
            {userBuyProducts?.filter((product) => product.dealt === true ).map((product) => (
              <li key={product.id} className="dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
              <Link href={`/products/${product.id}`} className="flex items-center sm:block" onClick={()=>sessionStorage.setItem('cameFromProfileItem', 'true')}>
                <Image width={300} height={300} src={product.photo} alt={product.title} className="aspect-square object-cover size-20 sm:size-auto" />
                <div className="p-2">
                  <h6 className="text-sm text-ellipsis whitespace-nowrap overflow-hidden default-textColor">{product.title}</h6>
                </div>
              </Link>
            </li>
            ))}
          </ol>
        )}
        <PageNation itemLength={paginatedBuyProducts?.length || 0} itemShowLength={limit} currentPage={page} onPageChange={(page) => setPage(page)}/>
      </div>
    </div>
  );
}
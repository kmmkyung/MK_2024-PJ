'use client'

import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavProfile from "./NavProfile";
import PageNation from "./PageNation";

export default function ProfileSell() {
  const { userProducts } = useUserContext();
  const [ sellTab, setSellTab ] = useState(sessionStorage.getItem('sellTab') !== 'false');
  const [ soldOutTab, setSoldOutTab ] = useState(sessionStorage.getItem('sellTab') === 'false');
  const [page, setPage] = useState(1);
  const paginatedSellProducts = userProducts?.slice((page - 1) * 5, page * 5);

  useEffect(() => {
    sessionStorage.setItem('sellTab', String(sellTab));
  }, [sellTab]);

  function tabClick(){
    setSellTab(prv=> !prv);
    setSoldOutTab(prv=> !prv);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">판매내역</h6>
        <NavProfile/>
      </div>
        <ol className="text-sm font-semibold mb-10 flex justify-between *:border-b-2">
          <li className={`w-1/2 text-center pb-2 cursor-pointer transition-colors ${sellTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>판매 중</li>
          <li className={`w-1/2 text-center cursor-pointer transition-colors ${soldOutTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={tabClick}>판매 완료</li>
        </ol>
        <div className="flex flex-col justify-between h-[calc(100%-44px-70px)]">
        {/* 판매 중인 상품 */}
        {sellTab && (
          userProducts?.filter((product) => product.dealt === false ).length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100%-74px)]">
              <p className="text-neutral-500 text-sm">판매 중인 상품이 없습니다.</p>
            </div>
          ) : (
            <ol className="grid grid-rows-3 grid-cols-1 sm:grid-cols-4 gap-5">
              {userProducts?.filter((product) => product.dealt === false ).map((product) => (
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
          )
        )}
        {/* 판매 완료 상품 */}
        {soldOutTab && (
          userProducts?.filter((product) => product.dealt === true ).length === 0 ? (
            <div className="flex justify-center items-center h-[calc(100%-74px)]">
            <p className="text-neutral-500 text-sm">판매 완료인 상품이 없습니다.</p>
            </div>
            ) : (
            <ol className="grid grid-rows-3 grid-cols-1 sm:grid-cols-4 gap-5">
              {userProducts?.filter((product) => product.dealt === true ).map((product) => (
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
          )
        )}
        <PageNation itemLength={paginatedSellProducts?.length || 0} currentPage={page} onPageChange={(page) => setPage(page)}/>
      </div>
    </div>
  );
}
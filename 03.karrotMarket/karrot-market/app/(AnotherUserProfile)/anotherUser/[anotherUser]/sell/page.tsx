'use client'

import NavProfile from "@/components/NavProfile";
import PageNation from "@/components/PageNation";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AnotherSell() {
  const { userProducts, anotherUserId } = useUserContext();
  const [ sellTab, setSellTab ] = useState(sessionStorage.getItem('sellTab') !== 'false');
  const [ soldOutTab, setSoldOutTab ] = useState(sessionStorage.getItem('sellTab') === 'false');
  const [ sellPage, setSellPage ] = useState(1);
  const [ sellOkPage, setSellOkPage ] = useState(1);
  const [limit, setLimit] = useState(5); 
  const sellingProducts = userProducts?.filter((product) => product.dealt === false) || [];
  const sellOKProducts = userProducts?.filter((product) => product.dealt === true) || [];
  const paginatedSellProducts = sellingProducts.slice((sellPage - 1) * limit, sellPage * limit);
  const paginatedSellOKProducts = sellOKProducts.slice((sellOkPage - 1) * limit, sellOkPage * limit);

  useEffect(() => {
    sessionStorage.setItem('sellTab', String(sellTab));
  }, [sellTab]);

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

  function tabClick(direction:string){
    if(direction === 'left'){
      setSellTab(true);
      setSoldOutTab(false);
    }
    else{
      setSellTab(false);
      setSoldOutTab(true);
    }
  };


  return (
    <section className="px-10 py-10 h-full w-full">
      <div className="w-full h-full">
        <div className="flex items-center justify-between mb-5">
        <h6 className="text-primary text-base font-semibold">판매내역</h6>
          <NavProfile userId={anotherUserId}/>
        </div>
        <ol className="text-sm font-semibold mb-10 flex justify-between *:border-b-2">
            <li className={`w-1/2 text-center pb-2 cursor-pointer transition-colors ${sellTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={()=>tabClick('left')}>판매 중</li>
            <li className={`w-1/2 text-center cursor-pointer transition-colors ${soldOutTab === true ? "text-primary border-primary" : "default-textColor border-neutral-100 dark:border-neutral-900"}`} onClick={()=>tabClick('right')}>판매 완료</li>
          </ol>
          <div className="flex flex-col justify-between h-[calc(100%-44px-70px)]">
          {/* 판매 중인 상품 */}
          {sellTab && (
            sellingProducts?.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-neutral-500 text-sm">판매 중인 상품이 없습니다.</p>
              </div>
            ) : (
              <div>
                <ol className="grid sm:grid-rows-2 grid-rows-5 grid-cols-1 sm:grid-cols-4 gap-5">
                  {paginatedSellProducts?.map((product) => (
                    <li key={product.id} className="dark:bg-neutral-800 rounded shadow dark:shadow-neutral-900 overflow-hidden">
                      <Link href={`/products/${product.id}`} className="flex items-center sm:block" onClick={()=>sessionStorage.setItem('cameFromProfileItem', 'true')}>
                        <Image width={300} height={300} src={product.photo} alt={product.title} className="aspect-square object-cover size-20 sm:size-auto"/>
                        <div className="p-2">
                          <h6 className="text-sm text-ellipsis whitespace-nowrap overflow-hidden default-textColor">{product.title}</h6>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            )
          )}
          {/* 판매 완료 상품 */}
          {soldOutTab && (
            sellOKProducts?.length === 0 ? (
              <div className="flex justify-center items-center h-full">
              <p className="text-neutral-500 text-sm">판매 완료인 상품이 없습니다.</p>
              </div>
              ) : (
                <ol className="grid sm:grid-rows-2 grid-rows-5 grid-cols-1 sm:grid-cols-4 gap-5">
                {paginatedSellOKProducts.map((product) => (
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
          {
          sellTab && paginatedSellProducts?.length !== 0 &&
          <PageNation itemLength={sellingProducts?.length || 0} itemShowLength={limit} currentPage={sellPage} onPageChange={(sellPage) => setSellPage(sellPage)}/>
          }
          {
          soldOutTab && paginatedSellOKProducts?.length !== 0 &&
          <PageNation itemLength={sellOKProducts?.length || 0} itemShowLength={limit} currentPage={sellOkPage} onPageChange={(sellOkPage) => setSellOkPage(sellOkPage)}/>
          }
        </div>
      </div>
    </section>
  )
}
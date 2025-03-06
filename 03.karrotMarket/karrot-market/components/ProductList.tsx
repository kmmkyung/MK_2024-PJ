'use client'

import { InitialProducts } from "@/app/(Tabs)/products/page";
import ProductListItem from "./ProductListItem";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(Tabs)/products/actions";

interface IProductList {
  initialProducts: InitialProducts
}
export default function ProductList({initialProducts}:IProductList) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const trigger = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const observer = new IntersectionObserver(
      // entries = observer.observe(trigger.current);
      async ( entries: IntersectionObserverEntry[], observer: IntersectionObserver ) => {
        const element = entries[0];
        if(element.isIntersecting && trigger.current){
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page+1);
          if(newProducts.length !== 0){
            setProducts(prev => [...prev, ...newProducts])
            setPage((prev)=> prev+1)
          }
          else { setLastPage(true) }  
          setIsLoading(false);
        }
      }, { threshold:1.0 }
    )
    // 요소가 있으면 관찰 시작
    if(trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    }
  },[page])

  return (
    <div className="py-5 flex flex-col gap-5">
      {products.map((product)=>{        
        return <ProductListItem key={product.id} {...product}/>
      })}
      {!lastPage && !isLoading? 
      <div ref={trigger} className="mx-auto size-[50] rounded-full gradient animate-spin bg-orange-500" style={{
      background: `conic-gradient(from 0deg, transparent 35%, #f97316 70%)`,
      maskImage: `radial-gradient(transparent 55%, #fff 56%)`,
    }}/>
      : <div className="h-[70]"/>}
    </div>
  )
}
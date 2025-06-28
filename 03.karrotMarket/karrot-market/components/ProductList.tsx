'use client'

import { CategoryType } from "@prisma/client";
import { getMoreProducts } from "@/app/(Tabs)/products/action";
import { InitialProducts } from "@/app/(Tabs)/products/page";
import ProductListItem from "./ProductListItem";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Spinner from "./Spinner";

interface IProductList {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductList) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [lastPage, setLastPage] = useState(false);
  const searchParamsCategory = useSearchParams().get('category');
  const spinnerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [cursor, setCursor] = useState<number | null>(
    initialProducts.length > 0 ? initialProducts[initialProducts.length - 1].id : null
  );

  useEffect(() => {
    setProducts(initialProducts);
    setCursor(
      initialProducts.length > 0 ? initialProducts[initialProducts.length - 1].id : null
    );
    setLastPage(false);
  }, [initialProducts, searchParamsCategory]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        observerRef.current?.disconnect();
        setIsLoading(true);
  
        const newProducts = await getMoreProducts(cursor, searchParamsCategory as CategoryType | null);
  
        if (newProducts.length > 0) {
          setProducts((prev) => [...prev, ...newProducts]);
          // 마지막 상품 id 업데이트
          setCursor(newProducts[newProducts.length - 1].id);
        } else {
          setLastPage(true);
        }
        setIsLoading(false);
      }
    });
  
    if (spinnerRef.current) {
      observerRef.current.observe(spinnerRef.current);
    }
  
    return () => observerRef.current?.disconnect();
  }, [cursor, searchParamsCategory]);

  return (
    <div className="flex flex-col gap-5 mt-[70px]">
      {products.map((product) => {
        return <ProductListItem key={product.id} {...product} />
      })}
      {!lastPage && !isLoading ? (
        <Spinner ref={spinnerRef} />
      ) : <div className="mb-[70px] py-5 text-center border-t border-dashed border-neutral-300 dark:border-neutral-700">
          <Image className="mx-auto" width={30} height={30} src="/image/rabbit.png" alt="rabbit" />
          <p className='text-xs mt-2'>더 이상 물건이 없습니다!</p>
          </div>}
    </div>
  );
}

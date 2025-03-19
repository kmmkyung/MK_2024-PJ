'use client'

import { InitialProducts } from "@/app/(Tabs)/products/page";
import ProductListItem from "./ProductListItem";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(Tabs)/products/actions";
import { useSearchParams } from "next/navigation";
import { CategoryType } from "@prisma/client";

interface IProductList {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductList) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [lastPage, setLastPage] = useState(false);
  const searchParamsCategory = useSearchParams().get('category');
  const trigger = useRef<HTMLDivElement>(null);
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
  
    if (trigger.current) {
      observerRef.current.observe(trigger.current);
    }
  
    return () => observerRef.current?.disconnect();
  }, [cursor, searchParamsCategory]);

  return (
    <div className="py-5 flex flex-col gap-5 mt-[55]">
      {products.map((product) => {
        return <ProductListItem key={product.id} {...product} />
      })}
      {!lastPage && !isLoading ? (
        <div
          ref={trigger}
          className="mx-auto size-[50] rounded-full gradient animate-spin bg-orange-500"
          style={{
            background: `conic-gradient(from 0deg, transparent 35%, #f97316 70%)`,
            maskImage: `radial-gradient(transparent 55%, #fff 56%)`,
          }}
        />
      ) : <div className="pb-[60]"/> }
    </div>
  );
}

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
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const searchParamsCategory = useSearchParams().get('category');
  const trigger = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(0);
    setLastPage(false);
  }, [initialProducts, searchParamsCategory]);

  useEffect(() => {
    // 기존 observer가 있으면 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 새 observer 생성
    observerRef.current = new IntersectionObserver(async (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        observerRef.current?.disconnect();
        setIsLoading(true);

        const newProducts = await getMoreProducts(page + 1, searchParamsCategory as CategoryType | null);

        if (newProducts.length > 0) {
          setProducts((prev) => [...prev, ...newProducts]);
          setPage((prev) => prev + 1);
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
  }, [page, products, searchParamsCategory]);

  return (
    <div className="py-5 flex flex-col gap-5">
      {products.map((product) => (
        <ProductListItem key={product.id} {...product} />
      ))}

      {!lastPage && !isLoading ? (
        <div
          ref={trigger}
          className="mx-auto size-[50] rounded-full gradient animate-spin bg-orange-500"
          style={{
            background: `conic-gradient(from 0deg, transparent 35%, #f97316 70%)`,
            maskImage: `radial-gradient(transparent 55%, #fff 56%)`,
          }}
        />
      ) : (
        <div className="h-[70]" />
      )}
    </div>
  );
}

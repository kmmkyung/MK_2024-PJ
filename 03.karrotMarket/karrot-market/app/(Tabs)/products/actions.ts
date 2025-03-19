'use server'

import db from "@/lib/db";
import { CategoryType } from "@prisma/client";

export async function getInitialProducts(category: CategoryType | null ) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
      category: true
    },
    take: 2,
    orderBy: [
      { created_at: "desc" },
      { id: "desc" },
    ],
    where: category ? { category } : {},
  });
  return products;
}

// export async function getMoreProducts(page:number, category: CategoryType | null){
//   const newProducts = await db.product.findMany({
//     select: {
//       title: true,
//       price: true,
//       created_at: true,  
//       photo: true,
//       id: true,
//       category: true
//     },
//     skip:page*2,
//     take: 2,
//     orderBy: [
//       { created_at: "desc" },
//       { id: "desc" },
//     ],
//     where: category ? { category } : {},
//   })
//   return newProducts;
// }

export async function getMoreProducts(cursorId: number | null, category: CategoryType | null) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,  
      photo: true,
      id: true,
      category: true
    },
    take: 2,
    orderBy: [
      { created_at: "desc" },
      { id: "desc" },
    ],
    cursor: cursorId ? { id: cursorId } : undefined,
    skip: cursorId ? 1 : 0, // 커서를 기준으로 건너뛰기
    where: category ? { category } : {},
  });
  return products;
}
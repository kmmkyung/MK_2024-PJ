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
    },
    take: 5,
    orderBy: {
      created_at: "desc",
    },
    where: category === null ? {} : { category },
  });
  return products;
}

export async function getMoreProducts(page:number, category: CategoryType | null){
  const newProducts = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,  
      photo: true,
      id: true,
    },
    skip:page*5,
    take: 5,
    orderBy: {
      created_at:"desc"
    },
    where: category === null ? {} : { category },
  })
  return newProducts;
}
"use server"

import db from "@/lib/db"

export async function searchList(searchKeyword: string) {
  await new Promise((r) => setTimeout(r, 5000));
  const [products, posts] = await Promise.all([
    db.product.findMany({
      where: { title: { contains: searchKeyword } },
    }),
    db.post.findMany({
      where: { title: { contains: searchKeyword } },
    }),
  ])
  return { products, posts }
}
"use server"

import db from "@/lib/db"

export async function searchList(searchKeyword: string) {
  // await new Promise((r) => setTimeout(r, 50000));
  const [products, posts] = await Promise.all([
    db.product.findMany({
      where: { title: { contains: searchKeyword } },
      orderBy: [{created_at: "desc" }]
    }),
    db.post.findMany({
      where: { title: { contains: searchKeyword } },
      orderBy: [{created_at: "desc" }]
    }),
  ])
  return { products, posts }
}
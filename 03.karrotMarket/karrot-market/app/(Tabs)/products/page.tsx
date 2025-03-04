import ProductList from "@/components/ProductList";
import db from "@/lib/db"
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts(){
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,  
      photo: true,
      id: true,
      category: true,
    },
    take: 1,
    orderBy: {
      created_at:"desc"
    }
  })
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

export default async function Products(){
  const initialProducts = await getInitialProducts();
  
  return (
    <section className="setting-page">
      <ProductList initialProducts = {initialProducts} />
      <Link href="/products/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 right-10 transition-colors hover:bg-primaryHover">
        <PlusIcon className="size-6 text-white"/>
      </Link>
    </section>
  )
}
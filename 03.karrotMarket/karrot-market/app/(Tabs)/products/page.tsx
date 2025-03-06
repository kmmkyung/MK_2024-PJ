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
    take: 5,
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
      <div className="relative w-full">
        <ul className="flex items-center overflow-x-hidden gap-5 *:text-sm *:text-center *:whitespace-nowrap">
          <li className="bg-primary">ALL</li>
          <li>Furniture</li>
          <li>Electronics</li>
          <li>Home & Garden</li>
          <li>Baby & Kids</li>
          <li>Fashion</li>
          <li>Health & Beauty</li>
          <li>Hobbies</li>
          <li>Books_Music</li>
          <li>Pet</li>
          <li>Other</li>
        </ul>
      </div>
      <ProductList initialProducts = {initialProducts} />
      <Link href="/products/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 right-10 transition-colors hover:bg-primaryHover">
        <PlusIcon className="size-6 text-white"/>
      </Link>
    </section>
  )
}
import Category from "@/components/Category";
import ProductList from "@/components/ProductList";
import db from "@/lib/db"
import { PlusIcon } from "@heroicons/react/24/solid";
import { CategoryType, Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialProducts(category: CategoryType){
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
    },
    where: {category: category}
  })  
  console.log(products);
  
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

function getCategoryEnum(category: string){
  const enumValue = category as CategoryType;
  if (Object.values(CategoryType).includes(enumValue)) {
    return enumValue;
  }
}

export default async function Products({ params }) {
  const { category } = await params
  console.log(category);
  
  // const stringCategory = searchParams.category

  // const category = getCategoryEnum(stringCategory!);
  // const initialProducts = await getInitialProducts(category!);
 
 
  return (
    <section className="setting-page">
      <Category/>
      {/* {
        initialProducts?
      <ProductList initialProducts = {initialProducts} />
      : null
      } */}
      <Link href="/products/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 right-10 transition-colors hover:bg-primaryHover">
        <PlusIcon className="size-6 text-white"/>
      </Link>
    </section>
  )
}
import Category from "@/components/Category";
import ProductList from "@/components/ProductList";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { CategoryType, Prisma } from "@prisma/client";
import { getInitialProducts } from "./actions";

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

function getCategoryEnum(category: string | null): CategoryType | null {
  if (!Object.values(CategoryType).includes(category as CategoryType)) {
    return null;
  }
  return category as CategoryType;
}
interface IProducts{
  searchParams:{
    category: string
  }
}

export default async function Products({searchParams}:IProducts) {
  
  const params = await searchParams;
  const category = params.category;
  const categoryEnum = getCategoryEnum(category as CategoryType | null)
  const initialProducts = await getInitialProducts(categoryEnum);

  return (
    <section className="setting-page">
      <Category />
      {
      initialProducts.length > 0 ? (
        <ProductList initialProducts={initialProducts} />
      ) : (
        <p>물건이 없습니다.</p>
      )}
      <Link href="/products/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 right-10 transition-colors hover:bg-primaryHover">
        <PlusIcon className="size-6 text-white" />
      </Link>
    </section>
  );
}

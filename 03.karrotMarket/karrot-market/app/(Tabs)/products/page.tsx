import Category from "@/components/Category";
import ProductList from "@/components/ProductList";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { CategoryType, Prisma } from "@prisma/client";
import { getInitialProducts } from "./action";
import { unstable_cache as nextCache } from "next/cache";

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>

function getCategoryEnum(category: string | null): CategoryType | null {
  if (!Object.values(CategoryType).includes(category as CategoryType)) {
    return null;
  }
  return category as CategoryType;
}
interface IProducts {
  searchParams: Promise<{ category: string }>;
}

export const metadata = {
  title:"Product"
}

export default async function Products({searchParams}:IProducts) {
  const params = await searchParams;
  const category = params.category;
  const categoryEnum = getCategoryEnum(category as CategoryType | null)
  // const initialProducts = await getInitialProducts(categoryEnum);

  const cachedGetProducts = await nextCache(
    async () => {
      return await getInitialProducts(categoryEnum)},
    [`products-${categoryEnum}`],
    { tags: ['products']}
  );

  const initialProducts = await cachedGetProducts();
  console.log(initialProducts);

  return (
    <section className="relative">
      <Category/>
      <div className="setting-page h-screen">
        {
          initialProducts.length > 0 ? (
            <ProductList initialProducts={initialProducts} />
          ) : ( 
            <div className="h-full flex items-center justify-center">
              <p className="text-sm">아직 등록된 물건이 없습니다</p>
            </div>
          )}
        <Link href="/product/add" className="bg-primary flex items-center justify-center rounded-full size-10 fixed bottom-20 md:bottom-10 right-5 transition-colors hover:bg-primaryHover">
          <PlusIcon className="size-6 text-white" />
        </Link>
      </div>
    </section>
  );
}


import { searchList } from "@/app/(Tabs)/search/action";
import { NewspaperIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import SearchProductsList from "./SearchProductsList";
import SearchPostsList from "./SearchPostsList";

export default async function SearchList({ searchKeyword }: { searchKeyword: string }) {
  if(searchKeyword == "") return null;
  const searchResponse = await searchList(searchKeyword);
  const { products, posts } = searchResponse;

  if(searchResponse){
    return (
      <section className="px-5 pt-[10px]">
        <div className="mt-[10px]">
          <div>
            <p className="text-sm font-semibold">
              <ShoppingCartIcon className="size-5 inline mr-1"/>Product • {products.length}개
            </p>
            <SearchProductsList products={products} />
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold">
              <NewspaperIcon className="size-5 inline mr-1"/>
              Post • {posts.length}개
            </p>
            <SearchPostsList posts={posts} />
          </div>
        </div>
      </section>
    );
  }
}

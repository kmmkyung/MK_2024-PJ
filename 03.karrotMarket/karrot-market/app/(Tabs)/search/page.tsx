import { Suspense } from "react";
import SearchForm from "@/components/SearchForm";
import SearchRecentWord from "@/components/SearchRecentWord";
import SearchList from "@/components/SearchList";
import Loading from "./(searchLoading)/loading";

export const metadata = {
  title:"Search"
}

export default async function Search({ searchParams }: { searchParams: Promise<{keyword?: string}> }) {
  const { keyword } = await searchParams
  const searchKeyword = keyword?.trim() || '';

  return (
    <section>
      <SearchForm searchKeyword={searchKeyword} />
      {searchKeyword === "" ? (
        <SearchRecentWord />
      ) : (
        <Suspense fallback={<Loading />}>
          <SearchList searchKeyword={searchKeyword}/>
        </Suspense>
      )}
    </section>
  );
}
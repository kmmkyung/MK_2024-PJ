import { searchList } from "@/app/(Tabs)/search/action";
import { $Enums } from "@prisma/client";

interface IsearchResponse {
  searchResponse: {
    products: {
      id: number;
      title: string;
      price: number;
      description: string;
      photo: string;
      created_at: Date;
      updated_at: Date;
      userId: number;
      category: $Enums.CategoryType;
    }[];
    posts: {
      id: number;
      title: string;
      description: string;
      views: number;
      created_at: Date;
      updated_at: Date;
      userId: number;
    }[];
  };
}


export default async function SearchList({ searchKeyword }: { searchKeyword: string }) {
  if(searchKeyword == "") return null;
  const searchResponse = await searchList(searchKeyword);
  
  if(searchResponse){
    return (
      <section className="setting-page">
        <div className="mt-[70]">
          {searchResponse?.products.length ? <p>product 있음</p> : <p>product 없음</p>}
          {searchResponse?.posts.length ? <p>posts 있음</p> : <p>posts 없음</p>}
        </div>
      </section>
    );
  }
}

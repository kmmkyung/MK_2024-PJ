'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const categories = [
  "ALL",
  "Furniture",
  "Electronics",
  "Home_Garden",
  "Baby_Kids",
  "Fashion",
  "Health_Beauty",
  "Hobbies",
  "Books_Music",
  "Pet",
  "Other",
];

export default function Category(){
  const router = useRouter();
  const searchParams = useSearchParams(); // 현재 query string
  const pathname = usePathname();

  function onClick(category: string){
    const params = new URLSearchParams(searchParams)
    
    params.set("category", category);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full">
      <ul className="flex items-center overflow-x-hidden gap-5 *:text-sm *:text-center *:whitespace-nowrap">
        {categories.map((ele,idx)=> {
          return <li key={idx} onClick={()=>onClick(ele)}>{ele}</li>
        })}
      </ul>
    </div>
  )
}